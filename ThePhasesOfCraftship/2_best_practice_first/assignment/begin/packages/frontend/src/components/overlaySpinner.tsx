import { Rings } from "react-loader-spinner";

export const OverlaySpinner = ({ isActive }: { isActive: boolean }) =>
  isActive ? (
    <div className="overlay-spinner">
      <Rings
        height="80"
        width="80"
        color="#4fa94d"
        radius="6"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
        ariaLabel="rings-loading"
      />
    </div>
  ) : (
    ""
  );
