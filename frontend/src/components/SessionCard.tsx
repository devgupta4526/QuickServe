import useDeleteSession from "../hooks/useDeleteSession";

interface Session {
  _id: string;
  createdAt: string;
  userAgent: string;
  isCurrent: boolean;
}

const SessionCard = ({ session }: { session: Session }) => {
  const { _id, createdAt, userAgent, isCurrent } = session;
  const { deleteSession, isPending } = useDeleteSession(_id);

  return (
    <div className="flex p-3 border border-gray-700 rounded-md bg-gray-800">
      <div className="flex-1">
        <p className="font-bold text-sm mb-1 text-white">
          {new Date(createdAt).toLocaleString("en-US")}
          {isCurrent && " (current session)"}
        </p>
        <p className="text-xs text-gray-400">{userAgent}</p>
      </div>
      {!isCurrent && (
        <button
          title="Delete Session"
          disabled={isPending}
          onClick={() => deleteSession()}
          className="ml-4 text-red-400 text-xl self-center hover:text-red-300"
        >
          {isPending ? "..." : "×"}
        </button>
      )}
    </div>
  );
};

export default SessionCard;
