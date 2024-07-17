import { Link } from "react-router-dom";
import "./Frame.css";

const Frame = () => {
  return (
    <div className="bankmain-parent">
      <div className="bankmain">
        <div className="bankmain-child" />
        <div className="rectangle-group">
          <div className="rectangle-div" />
          <div className="cashmate4">CashMate</div>
        </div>
        <div className="stocks-container">
          <Link to='/Stocks' className="stocks1">Stocks</Link>
        </div>
        <div className="group-div">
          <Link to='Virtual' className="virtual-curruncies4">Virtual Curruncies</Link>
        </div>
        <div className="bankmain-inner">
          <div className="virtual-curruncies-wrapper2">
            <Link to="Login" className="virtual-curruncies6" >Login</Link>
          </div>
        </div>
        <div className="virtual-curruncies-wrapper3">
          <Link to="Signup" className="virtual-curruncies6">Sign up</Link>
        </div>
        <div className="bankmain-inner1">
          <div className="group-container">
            
            <div className="vector-parent2">
              <img className="group-child3" alt="" src="/rectangle-34.svg" />
              <div className="cashmate6">CashMate</div>
            </div>
            <div className="vector-parent3">
              <img className="group-child4" alt="" src="/rectangle-35.svg" />
              <div className="group-child5" />
              <div className="abdelrahman-ismail1">ABDELRAHMAN ISMAIL</div>
              <div className="cashmate7">CashMate</div>
              <div className="div2">{`1234  5678  889  9999 `}</div>
              <div className="div3">12/28</div>
            </div>
          </div>
        </div>
        <div className="empower-your-financial-container1">
          <p className="empower-your-financial1">
            "Empower Your Financial Journey with CashMate Website: manage your
            finances, track transactions, transfer funds, and access valuable
            insights all in one secure and user-friendly platform. "
          </p>
        </div>
      </div>
    </div>
  );
};

export default Frame;