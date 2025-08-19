import { useSelector } from "react-redux";

export default function FeedUserCard({ user }) {
  const loggedInUser = useSelector((store) => store.user);
  return (
    <>
      <div className="flex items-center justify-center ">
        <div className="card bg-base-300 w-96 shadow-xl">
          <figure className="px-6 pt-10">
            <img
              src={user.photoUrl}
              alt="user-image"
              className="rounded-xl object-cover size-56"
            />
          </figure>
          <div className="card-body ">
            <h2 className="card-title text-left">
              {user.firstName + " " + user.lastName}
            </h2>
            <p className="text-left">{user.about}</p>
            {user.gender && user.age && (
              <div>{user.gender + "," + user.age}</div>
            )}

            {loggedInUser._id !== user.userId && (
              <div className="card-actions flex justify-end">
                <button className="btn btn-primary">Interested</button>
                <button className="btn btn-secondary">Ignore</button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
