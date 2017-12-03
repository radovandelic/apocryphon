import React, { Component } from "react";

import { connect } from 'react-redux';

import { flagAnimAdded } from '../sass/animations';

import { flags } from '../models';

class LangSwitcher extends Component {
  render() {
    const { changeLanguage } = this.props;
    var { languages, direction } = this.props;
    return (
      <div className="language_switcher">

        <div className="description">Choose Your {direction} Language.</div>
        <img
          src={`flags/${flags[languages[direction]].toLowerCase()}.svg`}
          className='flag'
          id={`chosen-flag-${direction}`}
          alt=' '>
        </img>
        <div className="select">
          <select
            defaultValue={languages[direction]}
            id="languages"
            onChange={e => {
              languages = e.target.value;
              changeLanguage(languages, direction);
              flagAnimAdded(direction);
            }}>
            <option value="af">Afrikaans </option>
            <option value="sq">Albanian </option>
            <option value="ar">Arabic </option>
            <option value="hy">Armenian </option>
            <option value="eu">Basque </option>
            <option value="bn">Bengali, Bangla </option>
            <option value="bs">Bosnian </option>
            <option value="bg">Bulgarian </option>
            <option value="ca">Catalan </option>
            <option value="zh">Chinese </option>
            <option value="hr">Croatian </option>
            <option value="cs">Czech </option>
            <option value="da">Danish </option>
            <option value="nl">Dutch </option>
            <option value="en">English </option>
            <option value="eo">Esperanto </option>
            <option value="et">Estonian </option>
            <option value="fi">Finnish </option>
            <option value="fr">French </option>
            <option value="gl">Galician </option>
            <option value="ka">Georgian </option>
            <option value="de">German </option>
            <option value="el">Greek (modern) </option>
            <option value="he">Hebrew (modern) </option>
            <option value="hi">Hindi </option>
            <option value="hu">Hungarian </option>
            <option value="id">Indonesian </option>
            <option value="is">Icelandic </option>
            <option value="it">Italian </option>
            <option value="ja">Japanese </option>
            <option value="kk">Kazakh </option>
            <option value="ko">Korean </option>
            <option value="lv">Latvian </option>
            <option value="lt">Lithuanian </option>
            <option value="mk">Macedonian </option>
            <option value="ml">Malayalam </option>
            <option value="ms">Malay </option>
            <option value="no">Norwegian </option>
            <option value="fa">Persian (Farsi) </option>
            <option value="pl">Polish </option>
            <option value="pt">Portuguese </option>
            <option value="ro">Romanian </option>
            <option value="ru">Russian </option>
            <option value="sr">Serbian </option>
            <option value="si">Sinhalese, Sinhala </option>
            <option value="sk">Slovak </option>
            <option value="sl">Slovene </option>
            <option value="es">Spanish </option>
            <option value="sv">Swedish </option>
            <option value="tl">Tagalog </option>
            <option value="ta">Tamil </option>
            <option value="te">Telugu </option>
            <option value="th">Thai </option>
            <option value="tr">Turkish </option>
            <option value="uk">Ukrainian </option>
            <option value="vi">Vietnamese </option>
          </select>
        </div>
      </div>

    );
  }
}

// Map Redux state to component props
const mapStateToProps = state => {
  return {
    languages: state.languages
  }
}

// Map Redux actions to component props
const mapDispatchToProps = dispatch => ({
  changeLanguage(language, direction) {
    dispatch({
      type: "CHANGE_LANGUAGE",
      language,
      direction
    })
  }
})

// Connected Components
LangSwitcher = connect(
  mapStateToProps,
  mapDispatchToProps
)(LangSwitcher)


export default LangSwitcher;
