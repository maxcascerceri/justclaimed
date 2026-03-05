import * as AlertDialog from '@radix-ui/react-alert-dialog'

interface PaywallModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export default function PaywallModal({ open, onOpenChange }: PaywallModalProps) {
  return (
    <AlertDialog.Root open={open} onOpenChange={onOpenChange}>
      <AlertDialog.Portal>
        <AlertDialog.Overlay className="fixed inset-0 z-50 bg-black/50 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
        <AlertDialog.Content className="fixed left-[50%] top-[50%] z-50 w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 rounded-lg border border-owed-border bg-owed-bg-page p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95">
          <AlertDialog.Title className="text-lg font-semibold text-owed-text-main">
            Unlock full access
          </AlertDialog.Title>
          <AlertDialog.Description className="text-sm text-owed-text-muted">
            Subscribe to get step-by-step claim instructions and direct links for every settlement.
          </AlertDialog.Description>
          <div className="flex justify-end gap-2 pt-4">
            <AlertDialog.Cancel asChild>
              <button type="button" className="btn-pill btn-secondary">
                Cancel
              </button>
            </AlertDialog.Cancel>
            <AlertDialog.Action asChild>
              <a
                href="https://justclaimed.com/subscribe"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-pill btn-primary"
              >
                Subscribe
              </a>
            </AlertDialog.Action>
          </div>
        </AlertDialog.Content>
      </AlertDialog.Portal>
    </AlertDialog.Root>
  )
}
