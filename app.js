const countryCodes = {
    AED: "AE",
    AFN: "AF",
    ALL: "AL",
    AMD: "AM",
    ANG: "CW",
    AOA: "AO",
    ARS: "AR",
    AUD: "AU",
    AWG: "AW",
    AZN: "AZ",
    BAM: "BA",
    BBD: "BB",
    BDT: "BD",
    BGN: "BG",
    BHD: "BH",
    BIF: "BI",
    BMD: "BM",
    BND: "BN",
    BOB: "BO",
    BRL: "BR",
    BSD: "BS",
    BTN: "BT",
    BWP: "BW",
    BYN: "BY",
    BZD: "BZ",
    CAD: "CA",
    CDF: "CD",
    CHF: "CH",
    CLP: "CL",
    CNY: "CN",
    COP: "CO",
    CRC: "CR",
    CUP: "CU",
    CVE: "CV",
    CZK: "CZ",
    DJF: "DJ",
    DKK: "DK",
    DOP: "DO",
    DZD: "DZ",
    EGP: "EG",
    ERN: "ER",
    ETB: "ET",
    EUR: "AD",
    FJD: "FJ",
    FKP: "FK",
    FOK: "FO",
    GBP: "GB",
    GEL: "GE",
    GGP: "GG",
    GHS: "GH",
    GIP: "GI",
    GMD: "GM",
    GNF: "GN",
    GTQ: "GT",
    GYD: "GY",
    HKD: "HK",
    HNL: "HN",
    HRK: "HR",
    HTG: "HT",
    HUF: "HU",
    IDR: "ID",
    ILS: "IL",
    IMP: "IM",
    INR: "IN",
    IQD: "IQ",
    IRR: "IR",
    ISK: "IS",
    JEP: "JE",
    JMD: "JM",
    JOD: "JO",
    JPY: "JP",
    KES: "KE",
    KGS: "KG",
    KHR: "KH",
    KID: "KI",
    KMF: "KM",
    KRW: "KR",
    KWD: "KW",
    KYD: "KY",
    KZT: "KZ",
    LAK: "LA",
    LBP: "LB",
    LKR: "LK",
    LRD: "LR",
    LSL: "LS",
    LYD: "LY",
    MAD: "MA",
    MDL: "MD",
    MGA: "MG",
    MKD: "MK",
    MMK: "MM",
    MNT: "MN",
    MOP: "MO",
    MRU: "MR",
    MUR: "MU",
    MVR: "MV",
    MWK: "MW",
    MXN: "MX",
    MYR: "MY",
    MZN: "MZ",
    NAD: "NA",
    NGN: "NG",
    NIO: "NI",
    NOK: "NO",
    NPR: "NP",
    NZD: "NZ",
    OMR: "OM",
    PAB: "PA",
    PEN: "PE",
    PGK: "PG",
    PHP: "PH",
    PKR: "PK",
    PLN: "PL",
    PYG: "PY",
    QAR: "QA",
    RON: "RO",
    RSD: "RS",
    RUB: "RU",
    RWF: "RW",
    SAR: "SA",
    SBD: "SB",
    SCR: "SC",
    SDG: "SD",
    SEK: "SE",
    SGD: "SG",
    SHP: "SH",
    SLL: "SL",
    SOS: "SO",
    SRD: "SR",
    SSP: "SS",
    STN: "ST",
    SVC: "SV",
    SYP: "SY",
    SZL: "SZ",
    THB: "TH",
    TJS: "TJ",
    TMT: "TM",
    TND: "TN",
    TOP: "TO",
    TRY: "TR",
    TTD: "TT",
    TVD: "TV",
    TWD: "TW",
    TZS: "TZ",
    UAH: "UA",
    UGX: "UG",
    USD: "US",
    UYU: "UY",
    UZS: "UZ",
    VES: "VE",
    VND: "VN",
    VUV: "VU",
    WST: "WS",
    XAF: "CM",
    XCD: "AG",
    XOF: "BJ",
    XPF: "PF",
    YER: "YE",
    ZAR: "ZA",
    ZMW: "ZM",
    ZWL: "ZW"
};

let fromCur = document.querySelector("#fromCur");
let toCur = document.querySelector("#toCur");
let fromFlagImg = document.querySelector(".from img");
let toFlagImg = document.querySelector(".to img");
let getBtn = document.querySelector("#get-val");
let userInput = document.querySelector(".get-value");
let baseUrl = "https://v6.exchangerate-api.com/v6/a465abf8673587cdc73e03a9/latest/";
let outputMsg = document.querySelector(".output-msg");
for (country in countryCodes) {
    fromCur.innerHTML += `<option value="${country}" class="fcountries">${countryCodes[country]}</option>`;
    toCur.innerHTML += `<option value="${country}" class="tcountries">${countryCodes[country]}</option>`;
}

fromCur.addEventListener("change", (evt) => {
    let currencyVal = evt.target.value;
    changeFromFlag(currencyVal);
})

toCur.addEventListener("change", (evt) => {
    let currencyVal = evt.target.value;
    changeToFlag(currencyVal);
})

const changeFromFlag = (currencyVal) => {
    for (currency in countryCodes) {
        if (currency == currencyVal) {
            fromFlagImg.setAttribute(`src`, `https://flagsapi.com/${countryCodes[currency]}/flat/64.png`)
        }
    };
}

const changeToFlag = (currencyVal) => {
    for (currency in countryCodes) {
        if (currency == currencyVal) {
            toFlagImg.setAttribute(`src`, `https://flagsapi.com/${countryCodes[currency]}/flat/64.png`)
        }
    };
}

getBtn.addEventListener("click", (evt) => {
    evt.preventDefault();
    amtVal = userInput.value;
    fromVal = fromCur.value;
    toVal = toCur.value;
    let URL = `${baseUrl}${fromVal}`;
    getData(URL, fromVal, toVal, amtVal);
})

const getData = async (URL, fromVal, toVal, amtVal) => {
    let api = await fetch(URL);
    let data = await api.json();
    let actualData = data.conversion_rates;
    for (curr in actualData) {
        if (curr == toVal) {
            finalRate = actualData[curr]
            displayRate = finalRate * amtVal;
            outputMsg.innerText = `${amtVal} ${fromVal} = ${displayRate} ${toVal}`;
        }
    }
}
