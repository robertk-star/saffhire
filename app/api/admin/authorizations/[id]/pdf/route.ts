import { NextResponse } from 'next/server';
import { jsPDF } from 'jspdf';
import { hasAdminPermission } from '@/lib/adminAuth';
import { getAuthorization } from '@/lib/driverPipelineAuthorization';

function line(doc: jsPDF, text: string, y: number, size = 10) {
  doc.setFontSize(size);
  const lines = doc.splitTextToSize(text, 180);
  const next = y + lines.length * (size * 0.45) + 2;
  if (next > 275) {
    doc.addPage();
    y = 16;
  }
  doc.text(lines, 15, y);
  return y + lines.length * (size * 0.45) + 2;
}

export async function GET(_request: Request, context: { params: Promise<{ id: string }> }) {
  if (!(await hasAdminPermission('authorizations'))) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const { id } = await context.params;
  const row = await getAuthorization(id);
  if (!row) return NextResponse.json({ error: 'Not found' }, { status: 404 });

  const doc = new jsPDF();
  let y = 16;
  doc.setFont('helvetica', 'bold');
  y = line(doc, 'Disclosure and Authorization for Background Screening and Motor Vehicle Report', y, 13);
  doc.setFont('helvetica', 'normal');
  y = line(doc, `Reference ${row.reference_code}  |  Electronically signed ${new Date(row.signed_at).toLocaleString('en-US', { timeZone: 'America/Chicago' })} CT`, y, 9);
  y += 2;
  y = line(doc, 'In connection with my application for employment, continued employment, or other permissible purpose, I understand that Driver Pipeline may obtain my motor vehicle record (MVR) and conduct a criminal background screening through its designated agents or consumer reporting agencies, including Saffhire, from state Departments of Motor Vehicles (DMV), law enforcement agencies, courts, or other authorized sources.', y);
  y = line(doc, 'The MVR may include my driving history, license status, traffic violations, accidents, and related information. The criminal background screening may include my criminal history, such as arrests, convictions, and other records from federal, state, or local agencies or courts.', y);
  y = line(doc, 'I agree that this information will be used for employment-related purposes, including evaluating my eligibility to operate a company or personal vehicle for company business and for employment, retention, promotion, or reassignment with Driver Pipeline.', y);
  y = line(doc, 'I authorize Driver Pipeline, Saffhire, and their agents to obtain and review my MVR and criminal background information now and, if employed, during my employment for retention, promotion, or reassignment, as permitted by law. I authorize any law enforcement agency, state or federal agency, institution, school, university, information service bureau, employer, or insurance company to provide requested background information to Driver Pipeline or Saffhire.', y);
  y = line(doc, 'This authorization remains in effect during my employment unless revoked in writing.', y);
  y = line(doc, 'Acknowledgment of Rights: I acknowledge receipt of the documents entitled "FCRA Disclosure Regarding Background Investigation" and "A Summary of Your Rights Under the Fair Credit Reporting Act" and certify that I have read and understand my rights. I also agree to sign this authorization electronically.', y);
  y += 2;
  const fields = [
    ['Applicant', `${row.first_name} ${row.no_middle_name ? '(no legal middle name)' : (row.middle_name || '')} ${row.last_name}`.replace(/\s+/g, ' ')],
    ['Email', row.email],
    ['Phone', row.phone || ''],
    ['Date of birth', row.date_of_birth],
    ['Social Security number', row.ssn],
    ['DL number', row.dl_number],
    ['License expiration', row.license_expiration || ''],
    ['Date issued', row.license_issued || ''],
    ['Issuing state', row.issuing_state],
    ['Current address', row.current_address],
    ['Approximate date moved in', row.dates_lived_here || ''],
    ['Other names used', row.other_names || ''],
    ['Years known by other names', row.years_used || ''],
    ['Typed signature', row.signature_name],
    ['IP address', row.ip_address || ''],
  ];
  fields.forEach(([label, value]) => {
    y = line(doc, `${label}: ${value || ''}`, y, 10);
  });
  y += 4;
  if (typeof row.signature_data_url === 'string' && row.signature_data_url.startsWith('data:image')) {
    doc.setFont('helvetica', 'bold');
    y = line(doc, 'Drawn signature', y, 11);
    doc.addImage(row.signature_data_url, 'PNG', 15, y, 80, 28);
    y += 34;
  }
  doc.setFont('helvetica', 'normal');
  line(doc, 'Prepared by SaffHire for Driver Pipeline. This PDF is the stored electronic authorization.', y, 8);
  const bytes = doc.output('arraybuffer');
  const filename = `${row.last_name}-${row.first_name}-authorization.pdf`.replace(/[^a-z0-9.-]+/gi, '-');
  return new NextResponse(Buffer.from(bytes), {
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename="${filename}"`,
      'Cache-Control': 'no-store',
    },
  });
}
