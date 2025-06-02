import { Link } from 'react-router-dom';
import PageHeader from '../../Layouts/PageHeader';
import AppFooter from '../../Layouts/AppFooter';

const CheckoutMemberShip = () => {
    return (
        <>
            <PageHeader />
            <div className="wrapper _bg4586 _new89 app-footer-padding">
                <div className="_215b15">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="title125">
                                    <div className="titleleft">
                                        <div className="ttl121">
                                            <nav aria-label="breadcrumb">
                                                <ol className="breadcrumb">
                                                    <li className="breadcrumb-item">
                                                        <Link to="/">Home</Link>
                                                    </li>
                                                    <li className="breadcrumb-item">
                                                        <Link to="/paidMembership">Paid Membership</Link>
                                                    </li>
                                                    <li className="breadcrumb-item active" aria-current="page">
                                                        Checkout
                                                    </li>
                                                </ol>
                                            </nav>
                                        </div>
                                    </div>
                                </div>
                                <div className="title126">
                                    <h2>Checkout</h2>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="mb4d25">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-8">
                                <div className="membership_chk_bg">
                                    <div className="checkout_title">
                                        <h4>Billing Details</h4>
                                        <img src="images/line.svg" alt="" />
                                    </div>
                                    <div className="panel-group" id="accordion" role="tablist" aria-multiselectable="true">
                                        <div className="panel panel-default">
                                            <div className="panel-heading" role="tab" id="address1">
                                                <div className="panel-title">
                                                    <a
                                                        className="collapsed"
                                                        data-toggle="collapse"
                                                        data-parent="#accordion"
                                                        href="#collapseaddress1"
                                                        aria-expanded="false"
                                                        aria-controls="collapseaddress1"
                                                    >
                                                        Edit Address
                                                    </a>
                                                </div>
                                            </div>
                                            <div
                                                id="collapseaddress1"
                                                className="panel-collapse collapse"
                                                role="tabpanel"
                                                aria-labelledby="address1"
                                            >
                                                <div className="panel-body">
                                                    <form>
                                                        <div className="row">
                                                            <div className="col-lg-6">
                                                                <div className="ui search focus mt-30 lbel25">
                                                                    <label>First Name*</label>
                                                                    <div className="ui left icon input swdh11 swdh19">
                                                                        <input
                                                                            className="prompt srch_explore"
                                                                            type="text"
                                                                            name="name"
                                                                            value="Joginder"
                                                                            id="id_name"
                                                                            required
                                                                            maxLength={64}
                                                                            placeholder="First Name"
                                                                        />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="col-lg-6">
                                                                <div className="ui search focus mt-30 lbel25">
                                                                    <label>Last Name*</label>
                                                                    <div className="ui left icon input swdh11 swdh19">
                                                                        <input
                                                                            className="prompt srch_explore"
                                                                            type="text"
                                                                            name="surname"
                                                                            value="Singh"
                                                                            id="id_surname"
                                                                            required
                                                                            maxLength={64}
                                                                            placeholder="Last Name"
                                                                        />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="col-lg-12">
                                                                <div className="ui search focus mt-30 lbel25">
                                                                    <label>Academy Name*</label>
                                                                    <div className="ui left icon input swdh11 swdh19">
                                                                        <input
                                                                            className="prompt srch_explore"
                                                                            type="text"
                                                                            name="academyname"
                                                                            value="Gambolthemes"
                                                                            id="id_academy"
                                                                            required
                                                                            maxLength={64}
                                                                            placeholder="Academy Name"
                                                                        />
                                                                    </div>
                                                                    <div className="help-block">
                                                                        If you want your invoices addressed to a academy. Leave
                                                                        blank to use your full name.
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="col-lg-12">
                                                                <div className="mt-30 lbel25">
                                                                    <label>Country*</label>
                                                                </div>
                                                                <div className="ui fluid search selection dropdown focus cntry152">
                                                                    <input
                                                                        type="hidden"
                                                                        name="country"
                                                                        className="prompt srch_explore"
                                                                    />
                                                                    <i className="dropdown icon"></i>
                                                                    <div className="default text">Select Country</div>
                                                                    <div className="menu">
                                                                        <div className="item" data-value="af">
                                                                            <i className="af flag"></i>Afghanistan
                                                                        </div>
                                                                        <div className="item" data-value="ax">
                                                                            <i className="ax flag"></i>Aland Islands
                                                                        </div>
                                                                        <div className="item" data-value="al">
                                                                            <i className="al flag"></i>Albania
                                                                        </div>
                                                                        <div className="item" data-value="dz">
                                                                            <i className="dz flag"></i>Algeria
                                                                        </div>
                                                                        <div className="item" data-value="as">
                                                                            <i className="as flag"></i>American Samoa
                                                                        </div>
                                                                        <div className="item" data-value="ad">
                                                                            <i className="ad flag"></i>Andorra
                                                                        </div>
                                                                        <div className="item" data-value="ao">
                                                                            <i className="ao flag"></i>Angola
                                                                        </div>
                                                                        <div className="item" data-value="ai">
                                                                            <i className="ai flag"></i>Anguilla
                                                                        </div>
                                                                        <div className="item" data-value="ag">
                                                                            <i className="ag flag"></i>Antigua
                                                                        </div>
                                                                        <div className="item" data-value="ar">
                                                                            <i className="ar flag"></i>Argentina
                                                                        </div>
                                                                        <div className="item" data-value="am">
                                                                            <i className="am flag"></i>Armenia
                                                                        </div>
                                                                        <div className="item" data-value="aw">
                                                                            <i className="aw flag"></i>Aruba
                                                                        </div>
                                                                        <div className="item" data-value="au">
                                                                            <i className="au flag"></i>Australia
                                                                        </div>
                                                                        <div className="item" data-value="at">
                                                                            <i className="at flag"></i>Austria
                                                                        </div>
                                                                        <div className="item" data-value="az">
                                                                            <i className="az flag"></i>Azerbaijan
                                                                        </div>
                                                                        <div className="item" data-value="bs">
                                                                            <i className="bs flag"></i>Bahamas
                                                                        </div>
                                                                        <div className="item" data-value="bh">
                                                                            <i className="bh flag"></i>Bahrain
                                                                        </div>
                                                                        <div className="item" data-value="bd">
                                                                            <i className="bd flag"></i>Bangladesh
                                                                        </div>
                                                                        <div className="item" data-value="bb">
                                                                            <i className="bb flag"></i>Barbados
                                                                        </div>
                                                                        <div className="item" data-value="by">
                                                                            <i className="by flag"></i>Belarus
                                                                        </div>
                                                                        <div className="item" data-value="be">
                                                                            <i className="be flag"></i>Belgium
                                                                        </div>
                                                                        <div className="item" data-value="bz">
                                                                            <i className="bz flag"></i>Belize
                                                                        </div>
                                                                        <div className="item" data-value="bj">
                                                                            <i className="bj flag"></i>Benin
                                                                        </div>
                                                                        <div className="item" data-value="bm">
                                                                            <i className="bm flag"></i>Bermuda
                                                                        </div>
                                                                        <div className="item" data-value="bt">
                                                                            <i className="bt flag"></i>Bhutan
                                                                        </div>
                                                                        <div className="item" data-value="bo">
                                                                            <i className="bo flag"></i>Bolivia
                                                                        </div>
                                                                        <div className="item" data-value="ba">
                                                                            <i className="ba flag"></i>Bosnia
                                                                        </div>
                                                                        <div className="item" data-value="bw">
                                                                            <i className="bw flag"></i>Botswana
                                                                        </div>
                                                                        <div className="item" data-value="bv">
                                                                            <i className="bv flag"></i>Bouvet Island
                                                                        </div>
                                                                        <div className="item" data-value="br">
                                                                            <i className="br flag"></i>Brazil
                                                                        </div>
                                                                        <div className="item" data-value="vg">
                                                                            <i className="vg flag"></i>British Virgin Islands
                                                                        </div>
                                                                        <div className="item" data-value="bn">
                                                                            <i className="bn flag"></i>Brunei
                                                                        </div>
                                                                        <div className="item" data-value="bg">
                                                                            <i className="bg flag"></i>Bulgaria
                                                                        </div>
                                                                        <div className="item" data-value="bf">
                                                                            <i className="bf flag"></i>Burkina Faso
                                                                        </div>
                                                                        <div className="item" data-value="mm">
                                                                            <i className="mm flag"></i>Burma
                                                                        </div>
                                                                        <div className="item" data-value="bi">
                                                                            <i className="bi flag"></i>Burundi
                                                                        </div>
                                                                        <div className="item" data-value="tc">
                                                                            <i className="tc flag"></i>Caicos Islands
                                                                        </div>
                                                                        <div className="item" data-value="kh">
                                                                            <i className="kh flag"></i>Cambodia
                                                                        </div>
                                                                        <div className="item" data-value="cm">
                                                                            <i className="cm flag"></i>Cameroon
                                                                        </div>
                                                                        <div className="item" data-value="ca">
                                                                            <i className="ca flag"></i>Canada
                                                                        </div>
                                                                        <div className="item" data-value="cv">
                                                                            <i className="cv flag"></i>Cape Verde
                                                                        </div>
                                                                        <div className="item" data-value="ky">
                                                                            <i className="ky flag"></i>Cayman Islands
                                                                        </div>
                                                                        <div className="item" data-value="cf">
                                                                            <i className="cf flag"></i>Central African Republic
                                                                        </div>
                                                                        <div className="item" data-value="td">
                                                                            <i className="td flag"></i>Chad
                                                                        </div>
                                                                        <div className="item" data-value="cl">
                                                                            <i className="cl flag"></i>Chile
                                                                        </div>
                                                                        <div className="item" data-value="cn">
                                                                            <i className="cn flag"></i>China
                                                                        </div>
                                                                        <div className="item" data-value="cx">
                                                                            <i className="cx flag"></i>Christmas Island
                                                                        </div>
                                                                        <div className="item" data-value="cc">
                                                                            <i className="cc flag"></i>Cocos Islands
                                                                        </div>
                                                                        <div className="item" data-value="co">
                                                                            <i className="co flag"></i>Colombia
                                                                        </div>
                                                                        <div className="item" data-value="km">
                                                                            <i className="km flag"></i>Comoros
                                                                        </div>
                                                                        <div className="item" data-value="cg">
                                                                            <i className="cg flag"></i>Congo Brazzaville
                                                                        </div>
                                                                        <div className="item" data-value="cd">
                                                                            <i className="cd flag"></i>Congo
                                                                        </div>
                                                                        <div className="item" data-value="ck">
                                                                            <i className="ck flag"></i>Cook Islands
                                                                        </div>
                                                                        <div className="item" data-value="cr">
                                                                            <i className="cr flag"></i>Costa Rica
                                                                        </div>
                                                                        <div className="item" data-value="ci">
                                                                            <i className="ci flag"></i>Cote Divoire
                                                                        </div>
                                                                        <div className="item" data-value="hr">
                                                                            <i className="hr flag"></i>Croatia
                                                                        </div>
                                                                        <div className="item" data-value="cu">
                                                                            <i className="cu flag"></i>Cuba
                                                                        </div>
                                                                        <div className="item" data-value="cy">
                                                                            <i className="cy flag"></i>Cyprus
                                                                        </div>
                                                                        <div className="item" data-value="cz">
                                                                            <i className="cz flag"></i>Czech Republic
                                                                        </div>
                                                                        <div className="item" data-value="dk">
                                                                            <i className="dk flag"></i>Denmark
                                                                        </div>
                                                                        <div className="item" data-value="dj">
                                                                            <i className="dj flag"></i>Djibouti
                                                                        </div>
                                                                        <div className="item" data-value="dm">
                                                                            <i className="dm flag"></i>Dominica
                                                                        </div>
                                                                        <div className="item" data-value="do">
                                                                            <i className="do flag"></i>Dominican Republic
                                                                        </div>
                                                                        <div className="item" data-value="ec">
                                                                            <i className="ec flag"></i>Ecuador
                                                                        </div>
                                                                        <div className="item" data-value="eg">
                                                                            <i className="eg flag"></i>Egypt
                                                                        </div>
                                                                        <div className="item" data-value="sv">
                                                                            <i className="sv flag"></i>El Salvador
                                                                        </div>
                                                                        <div className="item" data-value="gb">
                                                                            <i className="gb flag"></i>England
                                                                        </div>
                                                                        <div className="item" data-value="gq">
                                                                            <i className="gq flag"></i>Equatorial Guinea
                                                                        </div>
                                                                        <div className="item" data-value="er">
                                                                            <i className="er flag"></i>Eritrea
                                                                        </div>
                                                                        <div className="item" data-value="ee">
                                                                            <i className="ee flag"></i>Estonia
                                                                        </div>
                                                                        <div className="item" data-value="et">
                                                                            <i className="et flag"></i>Ethiopia
                                                                        </div>
                                                                        <div className="item" data-value="eu">
                                                                            <i className="eu flag"></i>European Union
                                                                        </div>
                                                                        <div className="item" data-value="fk">
                                                                            <i className="fk flag"></i>Falkland Islands
                                                                        </div>
                                                                        <div className="item" data-value="fo">
                                                                            <i className="fo flag"></i>Faroe Islands
                                                                        </div>
                                                                        <div className="item" data-value="fj">
                                                                            <i className="fj flag"></i>Fiji
                                                                        </div>
                                                                        <div className="item" data-value="fi">
                                                                            <i className="fi flag"></i>Finland
                                                                        </div>
                                                                        <div className="item" data-value="fr">
                                                                            <i className="fr flag"></i>France
                                                                        </div>
                                                                        <div className="item" data-value="gf">
                                                                            <i className="gf flag"></i>French Guiana
                                                                        </div>
                                                                        <div className="item" data-value="pf">
                                                                            <i className="pf flag"></i>French Polynesia
                                                                        </div>
                                                                        <div className="item" data-value="tf">
                                                                            <i className="tf flag"></i>French Territories
                                                                        </div>
                                                                        <div className="item" data-value="ga">
                                                                            <i className="ga flag"></i>Gabon
                                                                        </div>
                                                                        <div className="item" data-value="gm">
                                                                            <i className="gm flag"></i>Gambia
                                                                        </div>
                                                                        <div className="item" data-value="ge">
                                                                            <i className="ge flag"></i>Georgia
                                                                        </div>
                                                                        <div className="item" data-value="de">
                                                                            <i className="de flag"></i>Germany
                                                                        </div>
                                                                        <div className="item" data-value="gh">
                                                                            <i className="gh flag"></i>Ghana
                                                                        </div>
                                                                        <div className="item" data-value="gi">
                                                                            <i className="gi flag"></i>Gibraltar
                                                                        </div>
                                                                        <div className="item" data-value="gr">
                                                                            <i className="gr flag"></i>Greece
                                                                        </div>
                                                                        <div className="item" data-value="gl">
                                                                            <i className="gl flag"></i>Greenland
                                                                        </div>
                                                                        <div className="item" data-value="gd">
                                                                            <i className="gd flag"></i>Grenada
                                                                        </div>
                                                                        <div className="item" data-value="gp">
                                                                            <i className="gp flag"></i>Guadeloupe
                                                                        </div>
                                                                        <div className="item" data-value="gu">
                                                                            <i className="gu flag"></i>Guam
                                                                        </div>
                                                                        <div className="item" data-value="gt">
                                                                            <i className="gt flag"></i>Guatemala
                                                                        </div>
                                                                        <div className="item" data-value="gw">
                                                                            <i className="gw flag"></i>Guinea-Bissau
                                                                        </div>
                                                                        <div className="item" data-value="gn">
                                                                            <i className="gn flag"></i>Guinea
                                                                        </div>
                                                                        <div className="item" data-value="gy">
                                                                            <i className="gy flag"></i>Guyana
                                                                        </div>
                                                                        <div className="item" data-value="ht">
                                                                            <i className="ht flag"></i>Haiti
                                                                        </div>
                                                                        <div className="item" data-value="hm">
                                                                            <i className="hm flag"></i>Heard Island
                                                                        </div>
                                                                        <div className="item" data-value="hn">
                                                                            <i className="hn flag"></i>Honduras
                                                                        </div>
                                                                        <div className="item" data-value="hk">
                                                                            <i className="hk flag"></i>Hong Kong
                                                                        </div>
                                                                        <div className="item" data-value="hu">
                                                                            <i className="hu flag"></i>Hungary
                                                                        </div>
                                                                        <div className="item" data-value="is">
                                                                            <i className="is flag"></i>Iceland
                                                                        </div>
                                                                        <div className="item" data-value="in">
                                                                            <i className="in flag"></i>India
                                                                        </div>
                                                                        <div className="item" data-value="io">
                                                                            <i className="io flag"></i>Indian Ocean Territory
                                                                        </div>
                                                                        <div className="item" data-value="id">
                                                                            <i className="id flag"></i>Indonesia
                                                                        </div>
                                                                        <div className="item" data-value="ir">
                                                                            <i className="ir flag"></i>Iran
                                                                        </div>
                                                                        <div className="item" data-value="iq">
                                                                            <i className="iq flag"></i>Iraq
                                                                        </div>
                                                                        <div className="item" data-value="ie">
                                                                            <i className="ie flag"></i>Ireland
                                                                        </div>
                                                                        <div className="item" data-value="il">
                                                                            <i className="il flag"></i>Israel
                                                                        </div>
                                                                        <div className="item" data-value="it">
                                                                            <i className="it flag"></i>Italy
                                                                        </div>
                                                                        <div className="item" data-value="jm">
                                                                            <i className="jm flag"></i>Jamaica
                                                                        </div>
                                                                        <div className="item" data-value="jp">
                                                                            <i className="jp flag"></i>Japan
                                                                        </div>
                                                                        <div className="item" data-value="jo">
                                                                            <i className="jo flag"></i>Jordan
                                                                        </div>
                                                                        <div className="item" data-value="kz">
                                                                            <i className="kz flag"></i>Kazakhstan
                                                                        </div>
                                                                        <div className="item" data-value="ke">
                                                                            <i className="ke flag"></i>Kenya
                                                                        </div>
                                                                        <div className="item" data-value="ki">
                                                                            <i className="ki flag"></i>Kiribati
                                                                        </div>
                                                                        <div className="item" data-value="kw">
                                                                            <i className="kw flag"></i>Kuwait
                                                                        </div>
                                                                        <div className="item" data-value="kg">
                                                                            <i className="kg flag"></i>Kyrgyzstan
                                                                        </div>
                                                                        <div className="item" data-value="la">
                                                                            <i className="la flag"></i>Laos
                                                                        </div>
                                                                        <div className="item" data-value="lv">
                                                                            <i className="lv flag"></i>Latvia
                                                                        </div>
                                                                        <div className="item" data-value="lb">
                                                                            <i className="lb flag"></i>Lebanon
                                                                        </div>
                                                                        <div className="item" data-value="ls">
                                                                            <i className="ls flag"></i>Lesotho
                                                                        </div>
                                                                        <div className="item" data-value="lr">
                                                                            <i className="lr flag"></i>Liberia
                                                                        </div>
                                                                        <div className="item" data-value="ly">
                                                                            <i className="ly flag"></i>Libya
                                                                        </div>
                                                                        <div className="item" data-value="li">
                                                                            <i className="li flag"></i>Liechtenstein
                                                                        </div>
                                                                        <div className="item" data-value="lt">
                                                                            <i className="lt flag"></i>Lithuania
                                                                        </div>
                                                                        <div className="item" data-value="lu">
                                                                            <i className="lu flag"></i>Luxembourg
                                                                        </div>
                                                                        <div className="item" data-value="mo">
                                                                            <i className="mo flag"></i>Macau
                                                                        </div>
                                                                        <div className="item" data-value="mk">
                                                                            <i className="mk flag"></i>Macedonia
                                                                        </div>
                                                                        <div className="item" data-value="mg">
                                                                            <i className="mg flag"></i>Madagascar
                                                                        </div>
                                                                        <div className="item" data-value="mw">
                                                                            <i className="mw flag"></i>Malawi
                                                                        </div>
                                                                        <div className="item" data-value="my">
                                                                            <i className="my flag"></i>Malaysia
                                                                        </div>
                                                                        <div className="item" data-value="mv">
                                                                            <i className="mv flag"></i>Maldives
                                                                        </div>
                                                                        <div className="item" data-value="ml">
                                                                            <i className="ml flag"></i>Mali
                                                                        </div>
                                                                        <div className="item" data-value="mt">
                                                                            <i className="mt flag"></i>Malta
                                                                        </div>
                                                                        <div className="item" data-value="mh">
                                                                            <i className="mh flag"></i>Marshall Islands
                                                                        </div>
                                                                        <div className="item" data-value="mq">
                                                                            <i className="mq flag"></i>Martinique
                                                                        </div>
                                                                        <div className="item" data-value="mr">
                                                                            <i className="mr flag"></i>Mauritania
                                                                        </div>
                                                                        <div className="item" data-value="mu">
                                                                            <i className="mu flag"></i>Mauritius
                                                                        </div>
                                                                        <div className="item" data-value="yt">
                                                                            <i className="yt flag"></i>Mayotte
                                                                        </div>
                                                                        <div className="item" data-value="mx">
                                                                            <i className="mx flag"></i>Mexico
                                                                        </div>
                                                                        <div className="item" data-value="fm">
                                                                            <i className="fm flag"></i>Micronesia
                                                                        </div>
                                                                        <div className="item" data-value="md">
                                                                            <i className="md flag"></i>Moldova
                                                                        </div>
                                                                        <div className="item" data-value="mc">
                                                                            <i className="mc flag"></i>Monaco
                                                                        </div>
                                                                        <div className="item" data-value="mn">
                                                                            <i className="mn flag"></i>Mongolia
                                                                        </div>
                                                                        <div className="item" data-value="me">
                                                                            <i className="me flag"></i>Montenegro
                                                                        </div>
                                                                        <div className="item" data-value="ms">
                                                                            <i className="ms flag"></i>Montserrat
                                                                        </div>
                                                                        <div className="item" data-value="ma">
                                                                            <i className="ma flag"></i>Morocco
                                                                        </div>
                                                                        <div className="item" data-value="mz">
                                                                            <i className="mz flag"></i>Mozambique
                                                                        </div>
                                                                        <div className="item" data-value="na">
                                                                            <i className="na flag"></i>Namibia
                                                                        </div>
                                                                        <div className="item" data-value="nr">
                                                                            <i className="nr flag"></i>Nauru
                                                                        </div>
                                                                        <div className="item" data-value="np">
                                                                            <i className="np flag"></i>Nepal
                                                                        </div>
                                                                        <div className="item" data-value="an">
                                                                            <i className="an flag"></i>Netherlands Antilles
                                                                        </div>
                                                                        <div className="item" data-value="nl">
                                                                            <i className="nl flag"></i>Netherlands
                                                                        </div>
                                                                        <div className="item" data-value="nc">
                                                                            <i className="nc flag"></i>New Caledonia
                                                                        </div>
                                                                        <div className="item" data-value="pg">
                                                                            <i className="pg flag"></i>New Guinea
                                                                        </div>
                                                                        <div className="item" data-value="nz">
                                                                            <i className="nz flag"></i>New Zealand
                                                                        </div>
                                                                        <div className="item" data-value="ni">
                                                                            <i className="ni flag"></i>Nicaragua
                                                                        </div>
                                                                        <div className="item" data-value="ne">
                                                                            <i className="ne flag"></i>Niger
                                                                        </div>
                                                                        <div className="item" data-value="ng">
                                                                            <i className="ng flag"></i>Nigeria
                                                                        </div>
                                                                        <div className="item" data-value="nu">
                                                                            <i className="nu flag"></i>Niue
                                                                        </div>
                                                                        <div className="item" data-value="nf">
                                                                            <i className="nf flag"></i>Norfolk Island
                                                                        </div>
                                                                        <div className="item" data-value="kp">
                                                                            <i className="kp flag"></i>North Korea
                                                                        </div>
                                                                        <div className="item" data-value="mp">
                                                                            <i className="mp flag"></i>Northern Mariana Islands
                                                                        </div>
                                                                        <div className="item" data-value="no">
                                                                            <i className="no flag"></i>Norway
                                                                        </div>
                                                                        <div className="item" data-value="om">
                                                                            <i className="om flag"></i>Oman
                                                                        </div>
                                                                        <div className="item" data-value="pk">
                                                                            <i className="pk flag"></i>Pakistan
                                                                        </div>
                                                                        <div className="item" data-value="pw">
                                                                            <i className="pw flag"></i>Palau
                                                                        </div>
                                                                        <div className="item" data-value="ps">
                                                                            <i className="ps flag"></i>Palestine
                                                                        </div>
                                                                        <div className="item" data-value="pa">
                                                                            <i className="pa flag"></i>Panama
                                                                        </div>
                                                                        <div className="item" data-value="py">
                                                                            <i className="py flag"></i>Paraguay
                                                                        </div>
                                                                        <div className="item" data-value="pe">
                                                                            <i className="pe flag"></i>Peru
                                                                        </div>
                                                                        <div className="item" data-value="ph">
                                                                            <i className="ph flag"></i>Philippines
                                                                        </div>
                                                                        <div className="item" data-value="pn">
                                                                            <i className="pn flag"></i>Pitcairn Islands
                                                                        </div>
                                                                        <div className="item" data-value="pl">
                                                                            <i className="pl flag"></i>Poland
                                                                        </div>
                                                                        <div className="item" data-value="pt">
                                                                            <i className="pt flag"></i>Portugal
                                                                        </div>
                                                                        <div className="item" data-value="pr">
                                                                            <i className="pr flag"></i>Puerto Rico
                                                                        </div>
                                                                        <div className="item" data-value="qa">
                                                                            <i className="qa flag"></i>Qatar
                                                                        </div>
                                                                        <div className="item" data-value="re">
                                                                            <i className="re flag"></i>Reunion
                                                                        </div>
                                                                        <div className="item" data-value="ro">
                                                                            <i className="ro flag"></i>Romania
                                                                        </div>
                                                                        <div className="item" data-value="ru">
                                                                            <i className="ru flag"></i>Russia
                                                                        </div>
                                                                        <div className="item" data-value="rw">
                                                                            <i className="rw flag"></i>Rwanda
                                                                        </div>
                                                                        <div className="item" data-value="sh">
                                                                            <i className="sh flag"></i>Saint Helena
                                                                        </div>
                                                                        <div className="item" data-value="kn">
                                                                            <i className="kn flag"></i>Saint Kitts and Nevis
                                                                        </div>
                                                                        <div className="item" data-value="lc">
                                                                            <i className="lc flag"></i>Saint Lucia
                                                                        </div>
                                                                        <div className="item" data-value="pm">
                                                                            <i className="pm flag"></i>Saint Pierre
                                                                        </div>
                                                                        <div className="item" data-value="vc">
                                                                            <i className="vc flag"></i>Saint Vincent
                                                                        </div>
                                                                        <div className="item" data-value="ws">
                                                                            <i className="ws flag"></i>Samoa
                                                                        </div>
                                                                        <div className="item" data-value="sm">
                                                                            <i className="sm flag"></i>San Marino
                                                                        </div>
                                                                        <div className="item" data-value="gs">
                                                                            <i className="gs flag"></i>Sandwich Islands
                                                                        </div>
                                                                        <div className="item" data-value="st">
                                                                            <i className="st flag"></i>Sao Tome
                                                                        </div>
                                                                        <div className="item" data-value="sa">
                                                                            <i className="sa flag"></i>Saudi Arabia
                                                                        </div>
                                                                        <div className="item" data-value="sn">
                                                                            <i className="sn flag"></i>Senegal
                                                                        </div>
                                                                        <div className="item" data-value="cs">
                                                                            <i className="cs flag"></i>Serbia
                                                                        </div>
                                                                        <div className="item" data-value="rs">
                                                                            <i className="rs flag"></i>Serbia
                                                                        </div>
                                                                        <div className="item" data-value="sc">
                                                                            <i className="sc flag"></i>Seychelles
                                                                        </div>
                                                                        <div className="item" data-value="sl">
                                                                            <i className="sl flag"></i>Sierra Leone
                                                                        </div>
                                                                        <div className="item" data-value="sg">
                                                                            <i className="sg flag"></i>Singapore
                                                                        </div>
                                                                        <div className="item" data-value="sk">
                                                                            <i className="sk flag"></i>Slovakia
                                                                        </div>
                                                                        <div className="item" data-value="si">
                                                                            <i className="si flag"></i>Slovenia
                                                                        </div>
                                                                        <div className="item" data-value="sb">
                                                                            <i className="sb flag"></i>Solomon Islands
                                                                        </div>
                                                                        <div className="item" data-value="so">
                                                                            <i className="so flag"></i>Somalia
                                                                        </div>
                                                                        <div className="item" data-value="za">
                                                                            <i className="za flag"></i>South Africa
                                                                        </div>
                                                                        <div className="item" data-value="kr">
                                                                            <i className="kr flag"></i>South Korea
                                                                        </div>
                                                                        <div className="item" data-value="es">
                                                                            <i className="es flag"></i>Spain
                                                                        </div>
                                                                        <div className="item" data-value="lk">
                                                                            <i className="lk flag"></i>Sri Lanka
                                                                        </div>
                                                                        <div className="item" data-value="sd">
                                                                            <i className="sd flag"></i>Sudan
                                                                        </div>
                                                                        <div className="item" data-value="sr">
                                                                            <i className="sr flag"></i>Suriname
                                                                        </div>
                                                                        <div className="item" data-value="sj">
                                                                            <i className="sj flag"></i>Svalbard
                                                                        </div>
                                                                        <div className="item" data-value="sz">
                                                                            <i className="sz flag"></i>Swaziland
                                                                        </div>
                                                                        <div className="item" data-value="se">
                                                                            <i className="se flag"></i>Sweden
                                                                        </div>
                                                                        <div className="item" data-value="ch">
                                                                            <i className="ch flag"></i>Switzerland
                                                                        </div>
                                                                        <div className="item" data-value="sy">
                                                                            <i className="sy flag"></i>Syria
                                                                        </div>
                                                                        <div className="item" data-value="tw">
                                                                            <i className="tw flag"></i>Taiwan
                                                                        </div>
                                                                        <div className="item" data-value="tj">
                                                                            <i className="tj flag"></i>Tajikistan
                                                                        </div>
                                                                        <div className="item" data-value="tz">
                                                                            <i className="tz flag"></i>Tanzania
                                                                        </div>
                                                                        <div className="item" data-value="th">
                                                                            <i className="th flag"></i>Thailand
                                                                        </div>
                                                                        <div className="item" data-value="tl">
                                                                            <i className="tl flag"></i>Timorleste
                                                                        </div>
                                                                        <div className="item" data-value="tg">
                                                                            <i className="tg flag"></i>Togo
                                                                        </div>
                                                                        <div className="item" data-value="tk">
                                                                            <i className="tk flag"></i>Tokelau
                                                                        </div>
                                                                        <div className="item" data-value="to">
                                                                            <i className="to flag"></i>Tonga
                                                                        </div>
                                                                        <div className="item" data-value="tt">
                                                                            <i className="tt flag"></i>Trinidad
                                                                        </div>
                                                                        <div className="item" data-value="tn">
                                                                            <i className="tn flag"></i>Tunisia
                                                                        </div>
                                                                        <div className="item" data-value="tr">
                                                                            <i className="tr flag"></i>Turkey
                                                                        </div>
                                                                        <div className="item" data-value="tm">
                                                                            <i className="tm flag"></i>Turkmenistan
                                                                        </div>
                                                                        <div className="item" data-value="tv">
                                                                            <i className="tv flag"></i>Tuvalu
                                                                        </div>
                                                                        <div className="item" data-value="ug">
                                                                            <i className="ug flag"></i>Uganda
                                                                        </div>
                                                                        <div className="item" data-value="ua">
                                                                            <i className="ua flag"></i>Ukraine
                                                                        </div>
                                                                        <div className="item" data-value="ae">
                                                                            <i className="ae flag"></i>United Arab Emirates
                                                                        </div>
                                                                        <div className="item" data-value="us">
                                                                            <i className="us flag"></i>United States
                                                                        </div>
                                                                        <div className="item" data-value="uy">
                                                                            <i className="uy flag"></i>Uruguay
                                                                        </div>
                                                                        <div className="item" data-value="um">
                                                                            <i className="um flag"></i>Us Minor Islands
                                                                        </div>
                                                                        <div className="item" data-value="vi">
                                                                            <i className="vi flag"></i>Us Virgin Islands
                                                                        </div>
                                                                        <div className="item" data-value="uz">
                                                                            <i className="uz flag"></i>Uzbekistan
                                                                        </div>
                                                                        <div className="item" data-value="vu">
                                                                            <i className="vu flag"></i>Vanuatu
                                                                        </div>
                                                                        <div className="item" data-value="va">
                                                                            <i className="va flag"></i>Vatican City
                                                                        </div>
                                                                        <div className="item" data-value="ve">
                                                                            <i className="ve flag"></i>Venezuela
                                                                        </div>
                                                                        <div className="item" data-value="vn">
                                                                            <i className="vn flag"></i>Vietnam
                                                                        </div>
                                                                        <div className="item" data-value="wf">
                                                                            <i className="wf flag"></i>Wallis and Futuna
                                                                        </div>
                                                                        <div className="item" data-value="eh">
                                                                            <i className="eh flag"></i>Western Sahara
                                                                        </div>
                                                                        <div className="item" data-value="ye">
                                                                            <i className="ye flag"></i>Yemen
                                                                        </div>
                                                                        <div className="item" data-value="zm">
                                                                            <i className="zm flag"></i>Zambia
                                                                        </div>
                                                                        <div className="item" data-value="zw">
                                                                            <i className="zw flag"></i>Zimbabwe
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="col-lg-12">
                                                                <div className="ui search focus mt-30 lbel25">
                                                                    <label>Address1*</label>
                                                                    <div className="ui left icon input swdh11 swdh19">
                                                                        <input
                                                                            className="prompt srch_explore"
                                                                            type="text"
                                                                            name="addressname"
                                                                            value="#1234 Street No. 45, Ward No. 60, Phase 3"
                                                                            id="id_address1"
                                                                            required
                                                                            maxLength={300}
                                                                            placeholder="Address Line 1"
                                                                        />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="col-lg-12">
                                                                <div className="ui search focus mt-30 lbel25">
                                                                    <label>Address2*</label>
                                                                    <div className="ui left icon input swdh11 swdh19">
                                                                        <input
                                                                            className="prompt srch_explore"
                                                                            type="text"
                                                                            name="addressname2"
                                                                            value="Shahid Karnail Singh Nagar, Near Pakhowal Road"
                                                                            id="id_address2"
                                                                            required
                                                                            maxLength={300}
                                                                            placeholder="Address Line 2"
                                                                        />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="col-lg-6">
                                                                <div className="ui search focus mt-30 lbel25">
                                                                    <label>City*</label>
                                                                    <div className="ui left icon input swdh11 swdh19">
                                                                        <input
                                                                            className="prompt srch_explore"
                                                                            type="text"
                                                                            name="city"
                                                                            value="Ludhiana"
                                                                            id="id_city"
                                                                            required
                                                                            maxLength={64}
                                                                            placeholder="City"
                                                                        />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="col-lg-6">
                                                                <div className="ui search focus mt-30 lbel25">
                                                                    <label>State / Province / Region*</label>
                                                                    <div className="ui left icon input swdh11 swdh19">
                                                                        <input
                                                                            className="prompt srch_explore"
                                                                            type="text"
                                                                            name="state"
                                                                            value="Punjab"
                                                                            id="id_state"
                                                                            required
                                                                            maxLength={64}
                                                                            placeholder="State / Province / Region"
                                                                        />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="col-lg-6">
                                                                <div className="ui search focus mt-30 lbel25">
                                                                    <label>Zip/Postal Code*</label>
                                                                    <div className="ui left icon input swdh11 swdh19">
                                                                        <input
                                                                            className="prompt srch_explore"
                                                                            type="text"
                                                                            name="zip"
                                                                            value="141013"
                                                                            id="id_zip"
                                                                            required
                                                                            maxLength={64}
                                                                            placeholder="Zip / Postal Code"
                                                                        />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="col-lg-6">
                                                                <div className="ui search focus mt-30 lbel25">
                                                                    <label>Phone Number*</label>
                                                                    <div className="ui left icon input swdh11 swdh19">
                                                                        <input
                                                                            className="prompt srch_explore"
                                                                            type="text"
                                                                            name="phone"
                                                                            value="+91123456789"
                                                                            id="id_phone"
                                                                            required
                                                                            maxLength={12}
                                                                            placeholder="Phone Number"
                                                                        />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="col-lg-6">
                                                                <button className="save_address_btn" type="submit">
                                                                    Save Changes
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </form>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="address_text">
                                        Joginder Singh
                                        <br />
                                        #1234 Street No. 45, Ward No. 60, Phase 3,
                                        <br /> Shahid Karnail Singh Nagar, Near Pakhowal
                                        <br /> Road.
                                        <br />
                                        Ludhiana, Punjab, 141013
                                        <br />
                                        India
                                    </div>
                                </div>
                                <div className="membership_chk_bg">
                                    <div className="checkout_title">
                                        <h4>Select Payment Method</h4>
                                        <img src="images/line.svg" alt="" />
                                    </div>
                                    <div className="checkout-tabs">
                                        <ul className="nav nav-tabs" id="myTab" role="tablist">
                                            <li className="nav-item">
                                                <a
                                                    href="#credit-method-tab"
                                                    id="credit-tab"
                                                    className="nav-link active"
                                                    data-toggle="tab"
                                                >
                                                    <i className="uil uil-card-atm check_icon5"></i>Credit/Debit Card
                                                </a>
                                            </li>
                                            <li className="nav-item">
                                                <a href="#bank-method-tab" id="bank-tab" className="nav-link" data-toggle="tab">
                                                    <i className="uil uil-university check_icon5"></i>Bank Transfer
                                                </a>
                                            </li>
                                            <li className="nav-item">
                                                <a
                                                    href="#payapl-method-tab"
                                                    id="payapl-tab"
                                                    className="nav-link"
                                                    data-toggle="tab"
                                                >
                                                    <i className="uil uil-paypal check_icon5"></i>Paypal
                                                </a>
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="tab-content" id="myTabContent">
                                        <div
                                            className="tab-pane fade show active"
                                            id="credit-method-tab"
                                            role="tabpanel"
                                            aria-labelledby="credit-tab"
                                        >
                                            <form>
                                                <div className="row">
                                                    <div className="col-md-6">
                                                        <div className="ui search focus mt-30 lbel25">
                                                            <label>Holder Name</label>
                                                            <div className="ui left icon input swdh11 swdh19">
                                                                <input
                                                                    className="prompt srch_explore"
                                                                    type="text"
                                                                    name="holder[name]"
                                                                    value=""
                                                                    id="id_holdername"
                                                                    required
                                                                    maxLength={64}
                                                                    placeholder="Enter Holder Name"
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-6">
                                                        <div className="ui search focus mt-30 lbel25">
                                                            <label>Card Number</label>
                                                            <div className="ui left icon input swdh11 swdh19">
                                                                <input
                                                                    className="prompt srch_explore"
                                                                    type="text"
                                                                    name="card[number]"
                                                                    maxLength={16}
                                                                    placeholder="Card #"
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-4">
                                                        <div className="lbel25 mt-30">
                                                            <label>Expiration Month</label>
                                                            <select
                                                                className="ui hj145 dropdown cntry152 prompt srch_explore"
                                                                name="card[expire-month]"
                                                            >
                                                                <option value="">Month</option>
                                                                <option value="1">January</option>
                                                                <option value="2">February</option>
                                                                <option value="3">March</option>
                                                                <option value="4">April</option>
                                                                <option value="5">May</option>
                                                                <option value="6">June</option>
                                                                <option value="7">July</option>
                                                                <option value="8">August</option>
                                                                <option value="9">September</option>
                                                                <option value="10">October</option>
                                                                <option value="11">November</option>
                                                                <option value="12">December</option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-4">
                                                        <div className="ui search focus mt-30 lbel25">
                                                            <label>Expiration Year</label>
                                                            <div className="ui left icon input swdh11 swdh19">
                                                                <input
                                                                    className="prompt srch_explore"
                                                                    type="text"
                                                                    name="card[expire-year]"
                                                                    maxLength={4}
                                                                    placeholder="Year"
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-4">
                                                        <div className="ui search focus mt-30 lbel25">
                                                            <label>Expiration Year</label>
                                                            <div className="ui left icon input swdh11 swdh19">
                                                                <input
                                                                    className="prompt srch_explore"
                                                                    type="text"
                                                                    name="card[cvc]"
                                                                    maxLength={3}
                                                                    placeholder="CVC"
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </form>
                                        </div>
                                        <div
                                            className="tab-pane fade"
                                            id="bank-method-tab"
                                            role="tabpanel"
                                            aria-labelledby="bank-tab"
                                        >
                                            <form>
                                                <div className="row">
                                                    <div className="col-md-6">
                                                        <div className="ui search focus mt-30 lbel25">
                                                            <label>Account Holder Name</label>
                                                            <div className="ui left icon input swdh11 swdh19">
                                                                <input
                                                                    className="prompt srch_explore"
                                                                    type="text"
                                                                    name="account[holdername}"
                                                                    value=""
                                                                    required
                                                                    maxLength={64}
                                                                    placeholder="Enter Your Full Name"
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-6">
                                                        <div className="ui search focus mt-30 lbel25">
                                                            <label>Account Number</label>
                                                            <div className="ui left icon input swdh11 swdh19">
                                                                <input
                                                                    className="prompt srch_explore"
                                                                    type="text"
                                                                    name="Account[number]"
                                                                    maxLength={10}
                                                                    placeholder="Enter Account Number"
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-6">
                                                        <div className="lbel25 mt-30">
                                                            <label>Bank Name</label>
                                                            <select
                                                                className="ui hj145 dropdown cntry152 prompt srch_explore"
                                                                name="Bank[name]"
                                                            >
                                                                <option value="">State Bank of India</option>
                                                                <option value="1">Indian Bank</option>
                                                                <option value="2">ICICI Bank</option>
                                                                <option value="3">HDFC Bank</option>
                                                                <option value="4">Yes Bank</option>
                                                                <option value="5">Oriental Bank</option>
                                                                <option value="6">Punjab National Bank</option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-6">
                                                        <div className="ui search focus mt-30 lbel25">
                                                            <label>IFSC Code</label>
                                                            <div className="ui left icon input swdh11 swdh19">
                                                                <input
                                                                    className="prompt srch_explore"
                                                                    type="text"
                                                                    name="IFSC[code]"
                                                                    maxLength={10}
                                                                    placeholder="Enter IFSC Code"
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </form>
                                        </div>
                                        <div
                                            className="tab-pane fade"
                                            id="payapl-method-tab"
                                            role="tabpanel"
                                            aria-labelledby="payapl-tab"
                                        >
                                            <div className="row">
                                                <div className="col-md-12">
                                                    <p className="t-body">
                                                        After payment via PayPal's secure checkout, we will send you a link to
                                                        download your files.
                                                    </p>
                                                    <div className="media h-mt2">
                                                        <div className="media__item -align-center">
                                                            <p className="t2-body h-m0">PayPal accepts</p>
                                                        </div>
                                                        <div className="media__body">
                                                            <ul id="paypal-gateway" className="financial-institutes">
                                                                <li className="financial-institutes__logo">
                                                                    <img
                                                                        alt="Visa"
                                                                        title="Visa"
                                                                        src="images/membership/pyicon-1.svg"
                                                                    />
                                                                </li>
                                                                <li className="financial-institutes__logo">
                                                                    <img
                                                                        alt="MasterCard"
                                                                        title="MasterCard"
                                                                        src="images/membership/pyicon-2.svg"
                                                                    />
                                                                </li>
                                                                <li className="financial-institutes__logo">
                                                                    <img
                                                                        alt="American Express"
                                                                        title="American Express"
                                                                        src="images/membership/pyicon-3.svg"
                                                                    />
                                                                </li>
                                                                <li className="financial-institutes__logo">
                                                                    <img
                                                                        alt="Discover"
                                                                        title="Discover"
                                                                        src="images/membership/pyicon-4.svg"
                                                                    />
                                                                </li>
                                                                <li className="financial-institutes__logo">
                                                                    <img
                                                                        alt="China UnionPay"
                                                                        title="China UnionPay"
                                                                        src="images/membership/pyicon-5.svg"
                                                                    />
                                                                </li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="chckout_order_dt">
                                        <div className="checkout_title">
                                            <h4>Order Details</h4>
                                            <img src="images/line.svg" alt="" />
                                        </div>
                                        <div className="order_dt_section">
                                            <div className="order_title">
                                                <h4>Baby Plan</h4>
                                                <div className="order_price">$49</div>
                                            </div>
                                            <div className="order_title">
                                                <h6>Taxes(GST)</h6>
                                                <div className="order_price">$2</div>
                                            </div>
                                            <div className="order_title">
                                                <h3>Total</h3>
                                                <div className="order_price">$51</div>
                                            </div>
                                            <button className="chckot_btn" type="submit">
                                                Confirm Checkout
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-4">
                                <div className="membership_chk_bg rght1528">
                                    <div className="checkout_title">
                                        <h4>Order Summary</h4>
                                        <img src="images/line.svg" alt="" />
                                    </div>
                                    <div className="order_dt_section">
                                        <div className="order_title">
                                            <h4>Baby Plan</h4>
                                            <div className="order_price">$49</div>
                                        </div>
                                        <div className="order_title">
                                            <h6>Taxes(GST)</h6>
                                            <div className="order_price">$2</div>
                                        </div>
                                        <div className="order_title">
                                            <h2>Total</h2>
                                            <div className="order_price5">$51</div>
                                        </div>
                                        <div className="scr_text">
                                            <i className="uil uil-lock-alt"></i>Secure checkout
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <AppFooter />
            </div>
        </>
    );
};

export default CheckoutMemberShip;
