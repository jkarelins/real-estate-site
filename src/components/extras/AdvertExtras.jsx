import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchExtras, addExtra, removeExtra } from "../../actions/extra";
import "./advertextras.css";

const initialState = {
  text: ""
};

class AdvertExtras extends Component {
  state = initialState;

  componentDidMount = () => {
    if (this.props.myAdvert) {
      this.props.fetchExtras();
    }
  };

  addExtra = (id, text) => {
    const selectedExtrasIds = this.props.advert.advert_extras.map(
      extra => extra.extraId
    );
    if (selectedExtrasIds.includes(id)) {
      return;
    } else {
      this.props.addExtra(text);
    }
  };

  removeExtra = id => {
    this.props.removeExtra(id);
  };

  handleChange = e => {
    this.setState({
      text: e.target.value
    });
  };

  addNew = e => {
    e.preventDefault();
    this.props.addExtra(this.state.text);
    this.setState(initialState);
  };

  render() {
    if (this.props.myAdvert) {
      return (
        <div>
          <h4>Advantages</h4>
          {this.props.advert.advert_extras.map((extraCon, i) => (
            <span key={i} onClick={() => this.removeExtra(extraCon.extra.id)}>
              {extraCon.extra.text}{" "}
            </span>
          ))}
          <hr />
          <div>
            <h4>All Extras</h4>
            {this.props.extras.map((extra, i) => (
              <span key={i} onClick={() => this.addExtra(extra.id, extra.text)}>
                {extra.text}{" "}
              </span>
            ))}
          </div>
          <hr />
          <div>
            <h4>Add New</h4>
            <form onSubmit={e => this.addNew(e)}>
              <input
                type="text"
                name="text"
                value={this.state.text}
                onChange={this.handleChange}
              />
              <input type="submit" value="Add New" />
            </form>
          </div>
        </div>
      );
    } else {
      return (
        <div>
          <h4>Advantages</h4>
          {this.props.advert.advert_extras.map((extraCon, i) => (
            <p className="btn btn-sm btn-outline-info ml-1 allextras" key={i}>
              {extraCon.extra.text}
            </p>
          ))}
          <hr />
        </div>
      );
    }
  }
}

function mapStateToProps(state) {
  return {
    extras: state.extraReducer.fetchedExtras
  };
}

export default connect(mapStateToProps, { fetchExtras, addExtra, removeExtra })(
  AdvertExtras
);
