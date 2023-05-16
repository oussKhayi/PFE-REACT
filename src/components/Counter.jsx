import {
  incrCounter,
  decrCounter,
  emptyCounter,
  getCounterState,
} from "../features/counter/counterSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

function Counter() {
  const dispatch = useDispatch();
  const { count, isLoading, isDbError } = useSelector((state) => state.counter);

  console.log("Before dispatching getCounterState");
  useEffect(() => {
    dispatch(getCounterState());
  }, []);

  if (isLoading === true) {
    if(isDbError){
      return <div className="text-center mt-5 pt-5">
      <h1>check your internet connection and try again!</h1>
      </div>
    }
    return( <div className="text-center mt-5 pt-5">
      <div className="spinner-border mt-5" style={{width: '3rem', height: '3rem'}} role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>);
  }

  return (
    <main className="text-center mt-5 pt-5">
      <button className="btn btn-primary mx-1" onClick={() => dispatch(incrCounter())}>increment</button>
      <button className="btn btn-warning mx-1" onClick={() => dispatch(decrCounter())}>decrement</button>
      <h1>{count}</h1>
      <button className="btn btn-danger mx-2" onClick={() => dispatch(emptyCounter())}>reset</button>
    </main>
  );
}
export default Counter;
