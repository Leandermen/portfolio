require([
    "esri/config",
    "esri/Map",
    "esri/views/MapView",
    "esri/layers/FeatureLayer",
    "esri/symbols/SimpleFillSymbol"
], function (
    esriConfig,
    Map,
    MapView,
    FeatureLayer,
    SimpleFillSymbol
    ) {

    //esriConfig.apiKey = "YOUR_API_KEY";

    const map = new Map({
      basemap: "satellite" // Basemap layer service
    });
    
    const localRenderer = {
        type: "simple", // autocasts as new SimpleRenderer()
        symbol: {
            type: "simple-marker", // autocasts as new SimpleMarkerSymbol()
            style: "circle",
            size: 8,
            color: [0, 255, 255],
            outline: null
    }};;
    var fill = {
        type: "simple-fill",
        outline: { style: "none", color: [129, 129, 129, 1] },
        color: [50, 50, 50, 1]
      };
    
    const cityRenderer = {
        type: "simple",
        symbol: fill,   
    };
    
    const capalocales = new FeatureLayer({
        url:"https://services1.arcgis.com/LsoiDXzijohT7g97/arcgis/rest/services/Plebiscito2022/FeatureServer/0",
        renderer: localRenderer,
        minScale: 450000,
        maxScale: 0,
    });
    
    // const cityGraphicsLayer = new GraphicsLayer({
    //     blendMode: "destination-in",
    //     effect: "bloom(200%)"
    //   });
    
    const capaciudades = new FeatureLayer({
        url:"https://sig.ine.cl/server/rest/services/Open_Data/Asentamientos_Humanos/MapServer/3",
        renderer: cityRenderer,
        minScale: 450000,
        maxScale: 0,
        blendMode: "overlay",
        effect: "brightness(1.5) drop-shadow(0, 1px, 4px)",
        definitionExpression: "TIPO='PRINCIPAL'"
    });
    map.add(capaciudades);
    map.add(capalocales);

    const view = new MapView({
      map: map,
      center: [-70.666, -33.45], // Longitude, latitude
      zoom: 12, // Zoom level
      container: "mapamain" // Div element
    });

  });