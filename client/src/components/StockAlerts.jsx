import useLowStockAlerts  from "../hooks/useLowStockAlerts ";

const StockAlerts = () => {
  const { toasts, dismiss } = useLowStockAlerts ();
  if (!toasts.length) return null;

  return (
    <div className="fixed right-4 top-4 z-[9999] flex flex-col gap-3 pointer-events-none">
      {toasts.map(({ id, alert }) => (
        <div
          key={id}
          className="pointer-events-auto w-full max-w-xs p-4 text-gray-500 bg-white rounded-lg shadow-sm dark:bg-gray-800 dark:text-gray-400"
          role="alert"
        >
          <div className="flex">
            <div className="inline-flex items-center justify-center shrink-0 w-8 h-8 text-blue-500 bg-blue-100 rounded-lg dark:text-blue-300 dark:bg-blue-900">
              <svg
                className="w-5 h-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM10 15a1 1 0 1 1 0-2 1 1 0 0 1 0 2Zm1-4a1 1 0 0 1-2 0V6a1 1 0 0 1 2 0v5Z" />
              </svg>
              <span className="sr-only">Warning icon</span>
            </div>
            <div className="ms-3 text-sm font-normal">
              <span className="mb-1 text-sm font-semibold text-gray-900 dark:text-white">
                Stok Uyarısı
              </span>
              <div className="mb-2 text-sm font-normal">
                {alert?.message ??
                  `Stok kritik seviyede${
                    alert?.remaining ? ` (${alert.remaining})` : ""
                  }.`}
              </div>
            </div>
            <button
              type="button"
              onClick={() => dismiss(id)}
              className="ms-auto -mx-1.5 -my-1.5 bg-white items-center justify-center shrink-0 text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700"
              aria-label="Close"
            >
              <span className="sr-only">Close</span>
              <svg
                className="w-3 h-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StockAlerts;
