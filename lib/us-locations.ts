export const US_STATES = [
  { value: "AL", label: "Alabama" },
  { value: "AK", label: "Alaska" },
  { value: "AZ", label: "Arizona" },
  { value: "AR", label: "Arkansas" },
  { value: "CA", label: "California" },
  { value: "CO", label: "Colorado" },
  { value: "CT", label: "Connecticut" },
  { value: "DE", label: "Delaware" },
  { value: "FL", label: "Florida" },
  { value: "GA", label: "Georgia" },
  { value: "HI", label: "Hawaii" },
  { value: "ID", label: "Idaho" },
  { value: "IL", label: "Illinois" },
  { value: "IN", label: "Indiana" },
  { value: "IA", label: "Iowa" },
  { value: "KS", label: "Kansas" },
  { value: "KY", label: "Kentucky" },
  { value: "LA", label: "Louisiana" },
  { value: "ME", label: "Maine" },
  { value: "MD", label: "Maryland" },
  { value: "MA", label: "Massachusetts" },
  { value: "MI", label: "Michigan" },
  { value: "MN", label: "Minnesota" },
  { value: "MS", label: "Mississippi" },
  { value: "MO", label: "Missouri" },
  { value: "MT", label: "Montana" },
  { value: "NE", label: "Nebraska" },
  { value: "NV", label: "Nevada" },
  { value: "NH", label: "New Hampshire" },
  { value: "NJ", label: "New Jersey" },
  { value: "NM", label: "New Mexico" },
  { value: "NY", label: "New York" },
  { value: "NC", label: "North Carolina" },
  { value: "ND", label: "North Dakota" },
  { value: "OH", label: "Ohio" },
  { value: "OK", label: "Oklahoma" },
  { value: "OR", label: "Oregon" },
  { value: "PA", label: "Pennsylvania" },
  { value: "RI", label: "Rhode Island" },
  { value: "SC", label: "South Carolina" },
  { value: "SD", label: "South Dakota" },
  { value: "TN", label: "Tennessee" },
  { value: "TX", label: "Texas" },
  { value: "UT", label: "Utah" },
  { value: "VT", label: "Vermont" },
  { value: "VA", label: "Virginia" },
  { value: "WA", label: "Washington" },
  { value: "WV", label: "West Virginia" },
  { value: "WI", label: "Wisconsin" },
  { value: "WY", label: "Wyoming" },
];

export const US_CITIES_BY_STATE: Record<string, string[]> = {
  FL: [
    "Miami", "Tampa", "Orlando", "Jacksonville", "Fort Lauderdale",
    "West Palm Beach", "St. Petersburg", "Cape Coral", "Port St. Lucie",
    "Tallahassee", "Naples", "Sarasota", "Fort Myers", "Gainesville",
    "Lakeland", "Pensacola", "Daytona Beach", "Boca Raton", "Melbourne",
    "Kissimmee", "Clearwater", "Pompano Beach", "Palm Bay", "Hollywood"
  ],
  CA: [
    "Los Angeles", "San Francisco", "San Diego", "San Jose", "Sacramento",
    "Fresno", "Oakland", "Long Beach", "Anaheim", "Riverside", "Santa Ana",
    "Irvine", "Stockton", "Bakersfield", "Fremont", "San Bernardino",
    "Modesto", "Oxnard", "Fontana", "Moreno Valley", "Santa Clarita",
    "Huntington Beach", "Glendale", "Oceanside"
  ],
  TX: [
    "Houston", "Dallas", "Austin", "San Antonio", "Fort Worth", "El Paso",
    "Arlington", "Corpus Christi", "Plano", "Lubbock", "Laredo", "Irving",
    "Garland", "Frisco", "McKinney", "Amarillo", "Grand Prairie", "Brownsville",
    "Killeen", "Pasadena", "McAllen", "Mesquite", "Denton", "Midland"
  ],
  NY: [
    "New York", "Buffalo", "Rochester", "Syracuse", "Albany", "Yonkers",
    "New Rochelle", "White Plains", "Utica", "Binghamton", "Schenectady",
    "Niagara Falls", "Troy", "Ithaca", "Poughkeepsie", "Jamestown",
    "Elmira", "Watertown", "Newburgh", "Kingston", "Saratoga Springs",
    "Mount Vernon", "Hempstead", "Freeport"
  ],
  IL: [
    "Chicago", "Aurora", "Naperville", "Joliet", "Rockford", "Springfield",
    "Peoria", "Elgin", "Waukegan", "Champaign", "Bloomington", "Decatur",
    "Evanston", "Des Plaines", "Berwyn", "Wheaton", "Belleville", "Moline",
    "Palatine", "Normal", "Schaumburg", "Bolingbrook", "Orland Park", "Tinley Park"
  ],
  PA: [
    "Philadelphia", "Pittsburgh", "Allentown", "Erie", "Reading", "Scranton",
    "Bethlehem", "Lancaster", "Harrisburg", "York", "Altoona", "Wilkes-Barre",
    "Chester", "Easton", "Lebanon", "Hazleton", "New Castle", "Johnstown",
    "McKeesport", "Hermitage", "Norristown", "Monroeville", "Levittown", "State College"
  ],
  OH: [
    "Columbus", "Cleveland", "Cincinnati", "Toledo", "Akron", "Dayton",
    "Canton", "Youngstown", "Parma", "Lorain", "Springfield", "Hamilton",
    "Kettering", "Elyria", "Lakewood", "Cuyahoga Falls", "Euclid", "Middletown",
    "Newark", "Mansfield", "Mentor", "Beavercreek", "Cleveland Heights", "Strongsville"
  ],
  GA: [
    "Atlanta", "Augusta", "Columbus", "Macon", "Savannah", "Athens",
    "Sandy Springs", "Roswell", "Albany", "Johns Creek", "Warner Robins",
    "Alpharetta", "Marietta", "Valdosta", "Smyrna", "Dunwoody", "Rome",
    "East Point", "Milton", "Gainesville", "Peachtree City", "Hinesville", "Newnan", "Statesboro"
  ],
  NC: [
    "Charlotte", "Raleigh", "Greensboro", "Durham", "Winston-Salem", "Fayetteville",
    "Cary", "Wilmington", "High Point", "Asheville", "Concord", "Greenville",
    "Jacksonville", "Chapel Hill", "Rocky Mount", "Burlington", "Huntersville",
    "Wilson", "Kannapolis", "Apex", "Hickory", "Gastonia", "Wake Forest", "Mooresville"
  ],
  MI: [
    "Detroit", "Grand Rapids", "Warren", "Sterling Heights", "Ann Arbor", "Lansing",
    "Flint", "Dearborn", "Livonia", "Troy", "Westland", "Farmington Hills",
    "Kalamazoo", "Wyoming", "Southfield", "Rochester Hills", "Taylor", "Pontiac",
    "St. Clair Shores", "Royal Oak", "Novi", "Dearborn Heights", "Battle Creek", "Saginaw"
  ],
  AZ: [
    "Phoenix", "Tucson", "Mesa", "Chandler", "Scottsdale", "Glendale",
    "Gilbert", "Tempe", "Peoria", "Surprise", "Yuma", "Avondale", "Goodyear",
    "Flagstaff", "Buckeye", "Lake Havasu City", "Casa Grande", "Sierra Vista",
    "Maricopa", "Oro Valley", "Prescott", "Bullhead City", "Prescott Valley", "Apache Junction"
  ],
  WA: [
    "Seattle", "Spokane", "Tacoma", "Vancouver", "Bellevue", "Kent",
    "Everett", "Renton", "Spokane Valley", "Federal Way", "Yakima", "Bellingham",
    "Kennewick", "Auburn", "Pasco", "Marysville", "Lakewood", "Redmond",
    "Shoreline", "Richland", "Kirkland", "Burien", "Sammamish", "Olympia"
  ],
  MA: [
    "Boston", "Worcester", "Springfield", "Cambridge", "Lowell", "Brockton",
    "New Bedford", "Quincy", "Lynn", "Fall River", "Newton", "Lawrence",
    "Somerville", "Framingham", "Haverhill", "Waltham", "Malden", "Brookline",
    "Plymouth", "Medford", "Taunton", "Revere", "Peabody", "Methuen"
  ],
  TN: [
    "Nashville", "Memphis", "Knoxville", "Chattanooga", "Clarksville", "Murfreesboro",
    "Franklin", "Jackson", "Johnson City", "Bartlett", "Hendersonville", "Kingsport",
    "Collierville", "Smyrna", "Cleveland", "Brentwood", "Germantown", "Columbia",
    "Spring Hill", "La Vergne", "Gallatin", "Mount Juliet", "Lebanon", "Morristown"
  ],
  VA: [
    "Virginia Beach", "Norfolk", "Chesapeake", "Richmond", "Newport News",
    "Alexandria", "Hampton", "Roanoke", "Portsmouth", "Suffolk", "Lynchburg",
    "Harrisonburg", "Leesburg", "Charlottesville", "Danville", "Blacksburg",
    "Manassas", "Petersburg", "Fredericksburg", "Winchester", "Salem", "Staunton", "Bristol", "Hopewell"
  ],
  CO: [
    "Denver", "Colorado Springs", "Aurora", "Fort Collins", "Lakewood",
    "Thornton", "Arvada", "Westminster", "Pueblo", "Centennial", "Boulder",
    "Greeley", "Longmont", "Loveland", "Grand Junction", "Broomfield",
    "Castle Rock", "Commerce City", "Parker", "Littleton", "Northglenn", "Brighton", "Englewood", "Wheat Ridge"
  ],
  MO: [
    "Kansas City", "St. Louis", "Springfield", "Columbia", "Independence",
    "Lee's Summit", "O'Fallon", "St. Joseph", "St. Charles", "St. Peters",
    "Blue Springs", "Florissant", "Joplin", "Chesterfield", "Jefferson City",
    "Cape Girardeau", "Wildwood", "University City", "Ballwin", "Raytown", "Liberty", "Wentzville", "Gladstone", "Grandview"
  ],
};

export const getCitiesForState = (stateCode: string): string[] => {
  return US_CITIES_BY_STATE[stateCode] || [];
};





