import { connect } from "react-redux";
import { updateDateTime, showURL } from "../actions";
import { AppState } from "../Types";
import BasicFunction, {
  StateByProps,
  DispatchByProps
} from "../components/BasicFunction";

const mapStateToProps = (state: AppState): StateByProps => ({
  url: state.url,
  dateTime: state.dateTime
});

const mapDispatchToProps = (dispatch: any): DispatchByProps => ({
  updateTime: () => {
    dispatch(updateDateTime());
  },
  showURL: (url: string) => {
    dispatch(showURL(url));
  }
});

const Container = connect(
  mapStateToProps,
  mapDispatchToProps
)(BasicFunction);

export default Container;
