import { Outlet } from 'react-router-dom';
import { useToasts } from '../../hooks';
import { ToasterWidget } from '../../widgets/toaster.widget';

function AuthLayout() {
    const { toasts } = useToasts();

    return (
        <div className="bg-slate-100 font-exo text-slate-600 antialiased dark:bg-slate-900 dark:text-slate-400">
            <main className="bg-slate-100 dark:bg-slate-900">
                <div className="relative flex">
                    <div className="w-full md:w-1/2">
                        <div className="flex h-full min-h-screen flex-col after:flex-1">
                            <div className="flex-1">
                                <div className="flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
                                    <button className="block">
                                        <svg
                                            width="32"
                                            height="32"
                                            viewBox="0 0 32 32"
                                        >
                                            <defs>
                                                <linearGradient
                                                    x1="28.538%"
                                                    y1="20.229%"
                                                    x2="100%"
                                                    y2="108.156%"
                                                    id="logo-a"
                                                >
                                                    <stop
                                                        stopColor="#A5B4FC"
                                                        stopOpacity="0"
                                                        offset="0%"
                                                    />
                                                    <stop
                                                        stopColor="#A5B4FC"
                                                        offset="100%"
                                                    />
                                                </linearGradient>
                                                <linearGradient
                                                    x1="88.638%"
                                                    y1="29.267%"
                                                    x2="22.42%"
                                                    y2="100%"
                                                    id="logo-b"
                                                >
                                                    <stop
                                                        stopColor="#38BDF8"
                                                        stopOpacity="0"
                                                        offset="0%"
                                                    />
                                                    <stop
                                                        stopColor="#38BDF8"
                                                        offset="100%"
                                                    />
                                                </linearGradient>
                                            </defs>
                                            <rect
                                                fill="#6366F1"
                                                width="32"
                                                height="32"
                                                rx="16"
                                            />
                                            <path
                                                d="M18.277.16C26.035 1.267 32 7.938 32 16c0 8.837-7.163 16-16 16a15.937 15.937 0 01-10.426-3.863L18.277.161z"
                                                fill="#4F46E5"
                                            />
                                            <path
                                                d="M7.404 2.503l18.339 26.19A15.93 15.93 0 0116 32C7.163 32 0 24.837 0 16 0 10.327 2.952 5.344 7.404 2.503z"
                                                fill="url(#logo-a)"
                                            />
                                            <path
                                                d="M2.223 24.14L29.777 7.86A15.926 15.926 0 0132 16c0 8.837-7.163 16-16 16-5.864 0-10.991-3.154-13.777-7.86z"
                                                fill="url(#logo-b)"
                                            />
                                        </svg>
                                    </button>
                                </div>
                            </div>

                            <div className="mx-auto w-full max-w-sm px-4 py-8">
                                <Outlet />
                            </div>
                        </div>
                    </div>

                    <div
                        className="absolute bottom-0 right-0 top-0 hidden md:block md:w-1/2"
                        aria-hidden="true"
                    >
                        <img
                            className="h-full w-full object-cover object-center"
                            src="/assets/auth-image.jpg"
                            width="760"
                            height="1024"
                            alt="Authentication"
                        />
                        <img
                            className="absolute left-0 top-1/4 ml-8 hidden -translate-x-1/2 lg:block"
                            src="/assets/auth-decoration.png"
                            width="218"
                            height="224"
                            alt="Authentication decoration"
                        />
                    </div>
                </div>
            </main>
            <ToasterWidget toasts={toasts} />
        </div>
    );
}

export default AuthLayout;
