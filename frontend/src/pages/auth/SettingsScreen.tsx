// src/pages/Settings.tsx

import SessionCard from "../../components/SessionCard";
import useSessions from "../../hooks/useSessions";


const SettingsScreen: React.FC = () => {
    const { sessions, isPending, isSuccess, isError } = useSessions();

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4 py-10">
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-5xl flex overflow-hidden min-h-[500px]">
                {/* Illustration */}
                <div className="w-1/2 hidden md:flex items-center justify-center bg-gray-50">
                    <img
                        //   src={illustration}
                        src=""
                        alt="Sessions Illustration" className="w-4/5 h-auto" />
                </div>

                {/* Session Info */}
                <div className="w-full md:w-1/2 p-10 flex flex-col">
                    <h2 className="text-3xl font-extrabold text-gray-800 mb-6">My Sessions</h2>

                    {isPending && (
                        <div className="flex justify-center">
                            <div className="w-6 h-6 border-4 border-blue-400 border-t-transparent rounded-full animate-spin" />
                        </div>
                    )}

                    {isError && <p className="text-red-500">Failed to get sessions.</p>}

                    {isSuccess && (
                        <div className="space-y-4 overflow-y-auto max-h-[300px] pr-2">
                            {sessions.map((session: any) => (
                                <SessionCard key={session._id} session={session} />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SettingsScreen;
