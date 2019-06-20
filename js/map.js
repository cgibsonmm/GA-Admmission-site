document.addEventListener('DOMContentLoaded', () =>{
  document.getElementById('map-btn').addEventListener('click', function(){
    buildD3Map();
  })

  // Deletes map and Forces map to be rebuilt if window is resized
  window.addEventListener('resize', () => {
    d3.selectAll('g').remove();
  });
});

function createErrorEle(){
  var errorEle = document.createTextNode('No Server Connection')
  document.getElementById('error-mess').appendChild(errorEle)
}

function buildD3Map(){
  const topoMap = d3.json("./js/topoMap.json")

  Promise.all([topoMap, countiresVisited]).then(function(data){
    const mapData = data[0];
    const countries = data[1];

    parseMapData(mapData, countries)
  }).catch(error =>{
    console.log(error);
    createErrorEle()
  })

  function parseMapData(data, visited){
    var geoData = topojson.feature(data, data.objects.countries).features
    drawMap(geoData, visited)
  }

  function drawMap(map, visited){
    const countiresVisited = visited;

    var container = document.getElementById('map-modal')

    let dimensions = {
      width: container.clientWidth,
      margin: {
        top: 10,
        right: 10,
        bottom: 10,
        left: 10,
      },
    }

    dimensions.boundedWidth = dimensions.width
      - dimensions.margin.left
      - dimensions.margin.right

    const sphere = ({type: 'Sphere'})

    const projection = d3.geoEqualEarth()
      .fitWidth(dimensions.boundedWidth, sphere)

    const pathGenerator = d3.geoPath(projection)
    const [[x0, y0], [x1, y1]] = pathGenerator.bounds(sphere)

    dimensions.boundedHeight = y1
    dimensions.height = dimensions.boundedHeight
      + dimensions.margin.top
      + dimensions.margin.bottom

    const svg = d3.select('svg')
      .style('height', dimensions.height)
      .style('width', dimensions.width)

    const bounds = svg.append('g')
      .style("transform", `translate(${dimensions.margin.left}px, ${dimensions.margin.right}px)`)

    const earth = bounds.append('path')
      .attr('class', 'earth')
      .attr('d', pathGenerator(sphere))
      .attr('fill', 'rgba(63, 204, 98, 0.10)')

    const graticuleJson = d3.geoGraticule10();
    const graticule = bounds.append('path')
      .attr('class', "graticule")
      .attr('d', pathGenerator(graticuleJson))
      .attr('fill', 'none')
      .attr('stroke', 'rgb(30, 212, 240)')
      .attr('stroke-width', '0.2')

    const countries = bounds.selectAll(".country")
      .data(map)
      .enter().append('path')
      .attr('class', 'country')
      .attr('id', d => d.id)
      .attr('d', pathGenerator)
      .attr('fill', d => (
        countiresVisited.countries.includes(d.id) ? "rgb(207, 255, 0)": "rgb(241, 242, 239)"
      ))
      .attr('stroke', 'rgb(87, 87, 87)')
      .attr('stroke-width', '0.5')
  }
}


const countiresVisited = {
  countries: ['840', '214', '826', '028', '553', '056', '084','092', '136', '530', '214', '250', '340', '528', '659', '756', '796', '850', '044', '124', '276', '040', '484'
  ]
};
