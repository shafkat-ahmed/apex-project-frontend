import { useSelector } from "react-redux";

const Loader = () => {
  const { isLoading } = useSelector((state) => state.loader);

  if (!isLoading) return null;
  return (
    <div className="loader-container">
      <div className="loader"></div>
    </div>
  );
};

export default Loader;
