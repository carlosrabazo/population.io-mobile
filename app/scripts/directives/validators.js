var MONTH_REGEXP = /(January|February|March|April|May|June|July|August|September|October|November|December)/i;
var COUNTRIES_LIST = ["Afghanistan", "Albania", "Algeria", "Angola", "Antigua and Barbuda", "Azerbaijan", "Argentina", "Australia", "Austria", "Bahamas", "Bahrain", "Bangladesh", "Armenia", "Barbados", "Belgium", "Bhutan", "Bolivia", "Bosnia and Herzegovina", "Botswana", "Brazil", "Belize", "Solomon Islands", "Brunei", "Bulgaria", "Myanmar", "Burundi", "Belarus", "Cambodia", "Cameroon", "Canada", "Cape Verde", "Central African Republic", "Sri Lanka", "Chad", "Chile", "China", "Other non-specified areas", "Colombia", "Comoros", "Mayotte", "Congo", "DR Congo", "Costa Rica", "Croatia", "Cuba", "Cyprus", "Czech Republic", "Benin", "Denmark", "Dominican Republic", "Ecuador", "El Salvador", "Equatorial Guinea", "Ethiopia", "Eritrea", "Estonia", "Fiji", "Finland", "France", "French Guiana", "French Polynesia", "Djibouti", "Gabon", "Georgia", "Gambia", "Palestine", "Germany", "Ghana", "Kiribati", "Greece", "Grenada", "Guadeloupe", "Guam", "Guatemala", "Guinea", "Guyana", "Haiti", "Honduras", "Hong Kong", "Hungary", "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland", "Israel", "Italy", "Ivory Coast", "Jamaica", "Japan", "Kazakhstan", "Jordan", "Kenya", "North Korea", "South Korea", "Kuwait", "Kyrgyzstan", "Laos", "Lebanon", "Lesotho", "Latvia", "Liberia", "Libya", "Lithuania", "Luxembourg", "Macao", "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Martinique", "Mauritania", "Mauritius", "Mexico", "Mongolia", "Moldova", "Montenegro", "Morocco", "Mozambique", "Oman", "Namibia", "Nepal", "Netherlands", "Curacao", "Aruba", "New Caledonia", "Vanuatu", "New Zealand", "Nicaragua", "Niger", "Nigeria", "Norway", "Federated States of Micronesia", "Pakistan", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Poland", "Portugal", "Guinea-Bissau", "Timor-Leste", "Puerto Rico", "Qatar", "Reunion", "Romania", "Russia", "Rwanda", "Saint Lucia", "Saint Vincent and the Grenadines", "Sao Tome and Principe", "Saudi Arabia", "Senegal", "Serbia", "Seychelles", "Sierra Leone", "Singapore", "Slovakia", "Vietnam", "Slovenia", "Somalia", "South Africa", "Zimbabwe", "Spain", "South Sudan", "Sudan", "Western Sahara", "Suriname", "Swaziland", "Sweden", "Switzerland", "Syria", "Tajikistan", "Thailand", "Togo", "Tonga", "Trinidad and Tobago", "UAE", "Tunisia", "Turkey", "Turkmenistan", "Uganda", "Ukraine", "TFYR Macedonia", "Egypt", "UK", "Channel Islands", "Tanzania", "USA", "US Virgin Islands", "Burkina Faso", "Uruguay", "Uzbekistan", "Venezuela", "Samoa", "Yemen", "Zambia", "World", "More developed regions", "Less developed regions", "Africa", "Latin America and Caribbean", "Northern America", "Eastern Asia", "Europe", "Oceania", "Eastern Africa", "Middle Africa", "Northern Africa", "Southern Africa", "Western Africa", "Caribbean", "Central America", "South-Eastern Asia", "South-Central Asia", "Western Asia", "Eastern Europe", "Northern Europe", "Southern Europe", "Western Europe", "Australia and New Zealand", "Melanesia", "South America", "Less developed regions, excluding least developed countries", "Asia", "Least developed countries", "Sub-Saharan Africa", "Less developed regions, excluding China", "Micronesia", "Polynesia", "Central Asia", "Southern Asia"]

angular.module('populationioApp')
    .directive('validateMonth', function () {
        return {
            require: 'ngModel',
            link: function (scope, elm, attrs, ctrl) {
                ctrl.$parsers.unshift(function (viewValue) {
                    console.log(viewValue)
                    if (MONTH_REGEXP.test(viewValue)) {
                        // it is valid
                        ctrl.$setValidity('validateMonth', true);
                        ctrl.$modelValue = moment().month(viewValue).format('MM')
                        ctrl.$viewValue = viewValue.capitalize()
                        ctrl.$render();
                        return viewValue;
                    } else {
                        // it is invalid, return undefined (no model update)
                        ctrl.$setValidity('validateMonth', false);
                        return viewValue;
                    }
                });
            }
        };
    });

angular.module('populationioApp')
    .directive('validateCountry', function () {
        return {
            require: 'ngModel',
            link: function (scope, elm, attrs, ctrl) {
                ctrl.$parsers.unshift(function (viewValue) {
                    if (_.filter(COUNTRIES_LIST, function (v) {
                        return v.toLowerCase() == viewValue.toLowerCase()
                    }).length) {
                        // it is valid
                        ctrl.$setValidity('validateCountry', true);
                        ctrl.$modelValue = viewValue.capitalize();
                        console.log(ctrl.$modelValue)
                        ctrl.$viewValue = viewValue.capitalize();
                        ctrl.$render();
                        return viewValue;
                    } else {
                        // it is invalid, return undefined (no model update)
                        ctrl.$setValidity('validateCountry', false);
//                        ctrl.$render();
                        return viewValue;
                    }
                });
            }
        };
    });

angular.module('populationioApp')
    .directive('validateDay', function () {
        return {
            require: 'ngModel',
            link: function (scope, elm, attrs, ctrl) {
                ctrl.$parsers.unshift(function (viewValue) {
                    if (parseInt(viewValue) && parseInt(viewValue) > 0 && parseInt(viewValue) < 32) {
                        // it is valid
                        ctrl.$setValidity('validateDay', true);
                        ctrl.$modelValue = ctrl.$viewValue = parseInt(viewValue).toString();
                        ctrl.$render();

                        return parseInt(viewValue);
                    } else {
                        // it is invalid, return undefined (no model update)
                        ctrl.$setValidity('validateDay', false);
                        return undefined;
                    }
                });
            }
        };
    });
angular.module('populationioApp')
    .directive('validateYear', function () {
        return {
            require: 'ngModel',
            link: function (scope, elm, attrs, ctrl) {
                ctrl.$parsers.unshift(function (viewValue) {
                    if (parseInt(viewValue) && parseInt(viewValue) > 1919 && parseInt(viewValue) <= new Date().getFullYear()) {
                        // it is valid
                        ctrl.$setValidity('validateYear', true);
                        ctrl.$modelValue = ctrl.$viewValue = parseInt(viewValue).toString();
                        ctrl.$render();

                        return parseInt(viewValue);
                    } else {
                        // it is invalid, return undefined (no model update)
                        ctrl.$setValidity('validateYear', false);
                        return undefined;
                    }
                });
            }
        };
    });