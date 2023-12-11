import brainImage from "../figures/sub1.jpg";
import brainImage2 from "../figures/sub2.jpg";
import brainImage3 from "../figures/sub3.jpg";
import brainImage4 from "../figures/sub4.jpg";
import brainImage5 from "../figures/sub5.jpg";
import brainImage6 from "../figures/sub6.jpg";
import brainImage7 from "../figures/sub7.jpg";
import brainImage8 from "../figures/sub8.jpg";
import brainImage9 from "../figures/sub9.jpg";
import brainImage10 from "../figures/sub10.jpg";


const Brain = () => {
  return (
    <div className="mt-4">
      <div className="fs-3">
        <strong> Displayed below are 10 "fake" subject's T1-weighted images  </strong>
        
      </div>
      subject 1
      <div className="mt-4">
        <img width="40%" className="rounded" src={brainImage} alt="brain" />
      </div>
      subject 2
      <div className="mt-4">
        <img width="40%" className="rounded" src={brainImage2} alt="brain2" />
      </div>
      subject 3
      <div className="mt-4">
        <img width="40%" className="rounded" src={brainImage3} alt="brain3" />
      </div>
      subject 4
      <div className="mt-4">
        <img width="40%" className="rounded" src={brainImage4} alt="brain4" />
      </div>
      subject 5
      <div className="mt-4">
        <img width="40%" className="rounded" src={brainImage5} alt="brain5" />
      </div>
      subject 6
      <div className="mt-4">
        <img width="40%" className="rounded" src={brainImage6} alt="brain6" />
      </div>
      subject 7
      <div className="mt-4">
        <img width="40%" className="rounded" src={brainImage7} alt="brain7" />
      </div>
      subject 8
      <div className="mt-4">
        <img width="40%" className="rounded" src={brainImage8} alt="brain8" />
      </div>
      subject 9
      <div className="mt-4">
        <img width="40%" className="rounded" src={brainImage9} alt="brain9" />
      </div>
      subject 10
      <div className="mt-4">
        <img width="40%" className="rounded" src={brainImage10} alt="brain10" />
      </div>
      
      
    </div>
  );
};

export default Brain;