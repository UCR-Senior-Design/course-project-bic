import brainImage1 from "../svg-images/sub-01_dseg.svg";
import brainImage2 from "../svg-images/sub-02_dseg.svg";
import brainImage3 from "../svg-images/sub-03_dseg.svg";
import brainImage4 from "../svg-images/sub-04_dseg.svg";
import brainImage5 from "../svg-images/sub-05_dseg.svg";

const Mask = () => {
  return (
    <div className="mt-4">
      {/* subject 1 */}
      <div className="mt-4">
        <div className="fs-5">Subject 1</div>
        <img width="40%" className="rounded" src={brainImage1} alt="brain1" />
      </div>

      {/* subject 2 */}
      <div className="mt-4">
        <div className="fs-5">Subject 2</div>
        <img width="40%" className="rounded" src={brainImage2} alt="brain2" />
      </div>

      {/* subject 3 */}
      <div className="mt-4">
        <div className="fs-5">Subject 3</div>
        <img width="40%" className="rounded" src={brainImage3} alt="brain3" />
      </div>

      {/* subject 4 */}
      <div className="mt-4">
        <div className="fs-5">Subject 4</div>
        <img width="40%" className="rounded" src={brainImage4} alt="brain4" />
      </div>

      {/* subject 5 */}
      <div className="mt-4">
        <div className="fs-5">Subject 5</div>
        <img width="40%" className="rounded" src={brainImage5} alt="brain5" />
      </div>
    </div>
  );
};

export default Mask;