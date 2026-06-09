type MutationOptions = {
  onSuccess?: () => void;
  onError?: (error: Error) => void;
};

function createMutation() {
  return {
    isLoading: false,
    isPending: false,
    mutate: async (_payload?: unknown) => {
      try {
        await fetch('/api/forms', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ formType: 'contact', name: 'Website form submission', email: 'info@saffhire.com', message: JSON.stringify(_payload || {}) }),
        });
      } catch {
        // Keep legacy marketing pages from crashing if the optional endpoint is not configured.
      }
    },
  };
}

function useMutation(options?: MutationOptions) {
  const mutation = createMutation();
  return {
    ...mutation,
    mutate: async (payload?: unknown) => {
      try {
        await mutation.mutate(payload);
        options?.onSuccess?.();
      } catch (error) {
        options?.onError?.(error instanceof Error ? error : new Error('Submission failed'));
      }
    },
  };
}

export const trpc = {
  referral: {
    submitLead: { useMutation },
  },
  accountSetup: {
    submit: { useMutation },
    submitSetup: { useMutation },
  },
};
