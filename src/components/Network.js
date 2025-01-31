import React, { useState, useEffect, useRef } from 'react';
import * as d3 from 'd3';

//En resumen, este componente toma un objeto que representa páginas y sus enlaces, 
// y utiliza D3.js para renderizar una visualización de red interactiva en un SVG.
//  Los nodos representan las páginas, y los enlaces representan las conexiones entre ellas. 
// La simulación de fuerzas de D3.js se encarga de posicionar los nodos y enlaces de manera dinámica y atractiva.


const Network = ({ pages }) => {
  const svgRef = useRef();
  const [nodes, setNodes] = useState([]);
  const [links, setLinks] = useState([]);

  useEffect(() => {
    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove(); // Limpiar el SVG antes de redibujar

    const width = 600;
    const height = 400;

    svg.attr("width", width).attr("height", height);

    // Crear un conjunto de nodos y enlaces
    const nodesData = Object.keys(pages).map((page) => ({ id: page }));
    const linksData = [];

    for (const [page, linksArray] of Object.entries(pages)) {
      linksArray.forEach((link) => {
        linksData.push({ source: page, target: link });
      });
    }

    setNodes(nodesData);
    setLinks(linksData);

    // Dibujar enlaces
    svg.append("g")
      .attr("class", "links")
      .selectAll("line")
      .data(linksData)
      .enter().append("line")
      .attr("stroke", "#999")
      .attr("stroke-opacity", 0.6);

    // Dibujar nodos
    const node = svg.append("g")
      .attr("class", "nodes")
      .selectAll("circle")
      .data(nodesData)
      .enter().append("circle")
      .attr("r", 5)
      .attr("fill", (d) => d3.schemeCategory10[d.id]);
      

    node.append("title")
      .text((d) => d.id);

    // Actualizar la posición de nodos y enlaces
    const simulation = d3.forceSimulation(nodesData)
      .force("link", d3.forceLink().id((d) => d.id).distance(70))
      .force("charge", d3.forceManyBody().strength(-200))
      .force("center", d3.forceCenter(width / 2, height / 2))
      .on("tick", () => {
        svg.selectAll(".links line")
          .attr("x1", (d) => d.source.x)
          .attr("y1", (d) => d.source.y)
          .attr("x2", (d) => d.target.x)
          .attr("y2", (d) => d.target.y);

        svg.selectAll(".nodes circle")
          .attr("cx", (d) => d.x)
          .attr("cy", (d) => d.y);
      });

    simulation.force("link").links(linksData);
  }, [pages]);

  return (
    <svg ref={svgRef}></svg>
  );
};

export default Network;