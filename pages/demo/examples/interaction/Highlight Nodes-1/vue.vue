<template>
  <div v-if="Object.keys(data).length">
    <v-graph :data="data" :width="graph.width" :height="graph.width" :defaultEdge="graph.defaultEdge"
      :layout="graph.layout" :modes="graph.modes" :edgeStateStyles="graph.edgeStateStyles"
      :defaultNode="graph.defaultNode" :nodeStateStyles="graph.nodeStateStyles"
    >
    </v-graph>
  </div>
</template>

<script>


const graph = {
  type: 'graph',
  container: 'mount',
  width: 500,
  height: 500,
  pixelRatio: 2,
  renderer: 'svg',
  fitView: false,
  layout: {
    type: 'force',
    edgeStrength: 0.7
  },
  modes: {
    default: [ 'drag-canvas', {
      type: 'tooltip',
      formatText: function formatText(model) {
        return model.name;
      }
    }, {
      type: 'edge-tooltip',
      formatText: function formatText(model, e) {
        const edge = e.item;
        return '来源：' + edge.getSource().getModel().name + '<br/>去向：' + edge.getTarget().getModel().name;
      }
    }, 'activate-relations' ]
  },
  defaultNode: {
    size: [ 10, 10 ],
    style: {
      lineWidth: 2,
      fill: '#DEE9FF',
      stroke: '#5B8FF9'
    }
  },
  defaultEdge: {
    size: 1,
    style: {
      stroke: '#e2e2e2',
      lineAppendWidth: 2
    }
  },
  nodeStateStyles: {
    active: {
      opacity: 1
    },
    inactive: {
      opacity: 0.2
    }
  },
  edgeStateStyles: {
    active: {
      stroke: '#999'
    }
  }
};

export default {
  mounted(){
    $.getJSON('/assets/data/highlightNodes.json',oriData=>{
      const data = {
        nodes: oriData.nodes,
        edges: oriData.edges.map(function(edge, i) {
          return {...edge, id:'edge' + i };
        })
      }
      this.$data.data = data;
    });
  },
  data() {
    return {
      data:{},
      graph,
    };
  },
  methods: {

  }
};
</script>
