import React, { Component } from 'react'
import { connect } from "react-redux";
import {Link} from 'react-router-dom';
import { fetchCities } from "../../actions/seo";


class FirstMenu extends Component {
  componentDidMount = () => {
    this.props.fetchCities();
  }
  render() {
    if(!this.props.popularCities){
      return (
        <div className="container mt-3">
          <h4 className="my-3 text-center">Most Popular Cities</h4>
          <div className="row">
            <div className="col-6 col-md-3 text-center"><Link to="/search/city/Amsterdam">Amsterdam</Link></div>
            <div className="col-6 col-md-3 text-center"><Link to="/search/city/Rotterdam">Rotterdam</Link></div>
            <div className="col-6 col-md-3 text-center"><Link to="/search/city/Den Haag">Den Haag</Link></div>
            <div className="col-6 col-md-3 text-center"><Link to="/search/city/Utrecht">Utrecht</Link></div>
            <div className="col-6 col-md-3 text-center"><Link to="/search/city/Eindhoven">Eindhoven</Link></div>
            <div className="col-6 col-md-3 text-center"><Link to="/search/city/Tilburg">Tilburg</Link></div>
            <div className="col-6 col-md-3 text-center"><Link to="/search/city/Groningen">Groningen</Link></div>
            <div className="col-6 col-md-3 text-center"><Link to="/search/city/Almere">Almere</Link></div>
            <div className="col-6 col-md-3 text-center"><Link to="/search/city/Breda">Breda</Link></div>
            <div className="col-6 col-md-3 text-center"><Link to="/search/city/Nijmegen">Nijmegen</Link></div>
            <div className="col-6 col-md-3 text-center"><Link to="/search/city/Enschede">Enschede</Link></div>
            <div className="col-6 col-md-3 text-center"><Link to="/search/city/Haarlem">Haarlem</Link></div>
            <div className="col-6 col-md-3 text-center"><Link to="/search/city/Arnhem">Arnhem</Link></div>
            <div className="col-6 col-md-3 text-center"><Link to="/search/city/Zaanstad">Zaanstad</Link></div>
            <div className="col-6 col-md-3 text-center"><Link to="/search/city/Amersfoort">Amersfoort</Link></div>
            <div className="col-6 col-md-3 text-center"><Link to="/search/city/Apeldoorn">Apeldoorn</Link></div>
            <div className="col-6 col-md-3 text-center"><Link to="/search/city/Hertogenbosch">'s-Hertogenbosch</Link></div>
            <div className="col-6 col-md-3 text-center"><Link to="/search/city/Hoofddorp">Hoofddorp</Link></div>
            <div className="col-6 col-md-3 text-center"><Link to="/search/city/Maastricht">Maastricht</Link></div>
            <div className="col-6 col-md-3 text-center"><Link to="/search/city/Leiden">Leiden</Link></div>
          </div>
        </div>
      )
    } else {
      return (
        <div className="container mt-3">
        <h4 className="my-3 text-center">Most Popular Cities</h4>
        <div className="row">
            {this.props.popularCities.map((city, i) => (
              <div className="col-6 col-md-3 text-center" key={i}>
                <Link to={`/search/city/${city.city}`}>{`${city.city} (${city.advertCount})`}</Link>
              </div>
            ))}
        </div>
      </div>
      )
    }
  }
}

function mapStateToProps(state) {
  return {
    popularCities: state.seoReducer.fetchedCities,
  };
}

export default connect(mapStateToProps, { fetchCities })(FirstMenu);
