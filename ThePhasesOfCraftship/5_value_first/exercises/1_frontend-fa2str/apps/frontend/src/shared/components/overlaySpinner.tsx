import { ColorRing } from "react-loader-spinner";

export const OverlaySpinner = ({ isActive }: { isActive: boolean }) =>
  isActive ? (
    <div className="overlay-spinner">
      <ColorRing
        height="80"
        width="80"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
        ariaLabel="rings-loading"
      />
    </div>
  ) : (
    ""
  );
