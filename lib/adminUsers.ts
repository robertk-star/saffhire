import { pbkdf2Sync, randomBytes, timingSafeEqual } from 'crypto';
import { getSupabaseAdmin } from '@/lib/supabaseAdmin';

export const adminPermissionOptions = [
  { key: 'blogs', label: 'Blog Drafts', href: '/admin/blogs' },
  { key: 'social', label: 'Social Posts', href: '/admin/social' },
  { key: 'scheduler', label: 'Blog Scheduler', href: '/admin/blogs/schedule' },
  { key: 'pricing', label: 'Pricing Tool', href: '/admin/pricing' },
  { key: 'proposals', label: 'Create Proposal', href: '/admin/proposals' },
  { key: 'users', label: 'Admin Users', href: '/admin/users' },
] as const;

export type AdminPermission = typeof adminPermissionOptions[number]['key'];

export type AdminUser = {
  id: string;
  username: string;
  display_name: string | null;
  permissions: string[];
  is_active: boolean;
  created_at: string;
  updated_at: string;
};

const iterations = 120000;
const keyLength = 64;
const digest = 'sha512';

export function hashAdminPassword(password: string) {
  const salt = randomBytes(16).toString('hex');
  const hash = pbkdf2Sync(password, salt, iterations, keyLength, digest).toString('hex');
  return `pbkdf2:${iterations}:${salt}:${hash}`;
}

export function verifyAdminPassword(password: string, storedHash: string) {
  const [scheme, iter, salt, hash] = storedHash.split(':');
  if (scheme !== 'pbkdf2' || !iter || !salt || !hash) return false;
  const testHash = pbkdf2Sync(password, salt, Number(iter), keyLength, digest).toString('hex');
  try {
    return timingSafeEqual(Buffer.from(testHash), Buffer.from(hash));
  } catch {
    return false;
  }
}

export function cleanPermissions(input: string[]) {
  const allowed = new Set(adminPermissionOptions.map((option) => option.key));
  return Array.from(new Set(input.filter((permission) => allowed.has(permission as AdminPermission))));
}

export async function getAdminUsers(): Promise<AdminUser[]> {
  const supabase = getSupabaseAdmin();
  if (!supabase) return [];
  const { data, error } = await supabase
    .from('admin_users')
    .select('id, username, display_name, permissions, is_active, created_at, updated_at')
    .order('created_at', { ascending: false });
  if (error) {
    console.error('Unable to load admin users', error);
    return [];
  }
  return data || [];
}

export async function findAdminUserByUsername(username: string) {
  const supabase = getSupabaseAdmin();
  if (!supabase || !username) return null;
  const { data, error } = await supabase
    .from('admin_users')
    .select('id, username, display_name, password_hash, permissions, is_active')
    .ilike('username', username)
    .maybeSingle();
  if (error) {
    console.error('Unable to find admin user', error);
    return null;
  }
  return data;
}

export async function createAdminUser(input: { username: string; displayName?: string; password: string; permissions: string[] }) {
  const supabase = getSupabaseAdmin();
  if (!supabase) throw new Error('Supabase is not configured.');

  const username = input.username.trim().toLowerCase();
  if (!username) throw new Error('Username is required.');
  if (!input.password || input.password.length < 8) throw new Error('Password must be at least 8 characters.');

  const permissions = cleanPermissions(input.permissions);
  const { error } = await supabase.from('admin_users').insert({
    username,
    display_name: input.displayName?.trim() || null,
    password_hash: hashAdminPassword(input.password),
    permissions,
    is_active: true,
  });
  if (error) throw new Error(error.message);
}

export async function updateAdminUser(
  id: string,
  input: {
    username?: string;
    displayName?: string | null;
    password?: string;
    permissions?: string[];
    isActive?: boolean;
  },
) {
  const supabase = getSupabaseAdmin();
  if (!supabase) throw new Error('Supabase is not configured.');
  if (!id) throw new Error('User id is required.');

  const update: Record<string, unknown> = {};

  if (input.username !== undefined) {
    const username = input.username.trim().toLowerCase();
    if (!username) throw new Error('Username is required.');
    update.username = username;
  }

  if (input.displayName !== undefined) {
    update.display_name = input.displayName?.trim() || null;
  }

  if (input.password !== undefined && input.password !== '') {
    if (input.password.length < 8) throw new Error('Password must be at least 8 characters.');
    update.password_hash = hashAdminPassword(input.password);
  }

  if (input.permissions !== undefined) {
    update.permissions = cleanPermissions(input.permissions);
  }

  if (input.isActive !== undefined) {
    update.is_active = Boolean(input.isActive);
  }

  if (Object.keys(update).length === 0) throw new Error('No changes provided.');

  const { data, error } = await supabase
    .from('admin_users')
    .update(update)
    .eq('id', id)
    .select('id, username, display_name, permissions, is_active, created_at, updated_at')
    .single();

  if (error) throw new Error(error.message);
  return data as AdminUser;
}
