import {calculateTotalCost, isActivitys} from '../utils/common';

import AbstractSmartComponent from "./abstract-smart-component";
import Chart from "chart.js";
import ChartDataLabels from 'chartjs-plugin-datalabels';

const BAR_HEIGHT = 55;

const EmojiMap = {
  taxi: `🚕`,
  bus: `🚌`,
  train: `🚂`,
  ship: `🚢`,
  transport: `🚊`,
  drive: `🚗`,
  flight: `✈️`,
  check: `🏨`,
  sightseeing: `🏛`,
  restaurant: `🍴`,
};

const getAllDifferentTypes = (points) => {
  const defferentTypes = [];
  for (const point of points) {
    if (!defferentTypes.some((it) => it === point.type)) {
      defferentTypes.push(point.type);
    }
  }
  return defferentTypes;
};

const getTotalCostOfType = (points, type) => {
  const pointsOfSelectedType = [];
  for (const point of points) {
    if (point.type === type) {
      pointsOfSelectedType.push(point);
    }
  }
  return calculateTotalCost(pointsOfSelectedType);
};

const getTotalCountOfType = (points, type) => {
  const pointsOfSelectedType = [];
  for (const point of points) {
    if (point.type === type) {
      pointsOfSelectedType.push(point);
    }
  }
  return pointsOfSelectedType.length;
};

const sortMoneyInfo = (allDifferentTypes, totalPrices) => {
  const moneyInfo = allDifferentTypes.map((it, index) => {
    return {
      type: it,
      totalCost: totalPrices[index],
    };
  });
  moneyInfo.sort((a, b) => (b.totalCost - a.totalCost));
  return moneyInfo;
};

const sortTransportInfo = (allDifferentTypes, totalCount) => {
  const transportInfo = allDifferentTypes.map((it, index) => {
    return {
      type: it,
      count: totalCount[index],
    };
  });
  transportInfo.sort((a, b) => (b.count - a.count));
  return transportInfo;
};

const renderMoneyChart = (moneyCtx, points) => {
  const allDifferentTypes = getAllDifferentTypes(points);
  const totalPrices = [];
  for (const type of allDifferentTypes) {
    totalPrices.push(getTotalCostOfType(points, type));
  }
  const sortedMoneyInfo = sortMoneyInfo(allDifferentTypes, totalPrices);
  const sortedPrices = sortedMoneyInfo.map((it)=>{
    return it.totalCost;
  });
  const sortedTypes = sortedMoneyInfo.map((it)=>{
    return it.type;
  });

  const labels = sortedTypes.map((it)=>{
    if (it === `check-in`) {
      return `${EmojiMap[`check`]} ${it.toUpperCase()}`;
    }
    return `${EmojiMap[it]} ${it.toUpperCase()}`;
  });

  return new Chart(moneyCtx, {
    plugins: [ChartDataLabels],
    type: `horizontalBar`,
    data: {
      labels,
      datasets: [{
        data: sortedPrices,
        backgroundColor: `#ffffff`,
        hoverBackgroundColor: `#ffffff`,
        anchor: `start`,
        barThickness: 44,
        minBarLength: 50,
      }]
    },
    options: {
      plugins: {
        datalabels: {
          font: {
            size: 13
          },
          color: `#000000`,
          anchor: `end`,
          align: `start`,
          formatter: (val) => `€ ${val}`
        }
      },
      title: {
        display: true,
        text: `MONEY`,
        fontColor: `#000000`,
        fontSize: 23,
        position: `left`
      },
      scales: {
        yAxes: [{
          ticks: {
            fontColor: `#000000`,
            padding: 5,
            fontSize: 13,
          },
          gridLines: {
            display: false,
            drawBorder: false
          },
        }],
        xAxes: [{
          ticks: {
            display: false,
            beginAtZero: true,
          },
          gridLines: {
            display: false,
            drawBorder: false
          },
        }],
      },
      legend: {
        display: false
      },
      tooltips: {
        enabled: false,
      }
    }
  });
};

const renderTransportChart = (transportCtx, points) => {
  const allDifferentTypes = getAllDifferentTypes(points);
  const totalCountPointsOfTypes = [];
  for (const type of allDifferentTypes) {
    totalCountPointsOfTypes.push(getTotalCountOfType(points, type));
  }
  const sortedTransportInfo = sortTransportInfo(allDifferentTypes, totalCountPointsOfTypes);
  const sortedNumberOfRepetitions = sortedTransportInfo.map((it) => {
    return it.count;
  });
  const sortedTypes = sortedTransportInfo.map((it) => {
    return it.type;
  });

  const labels = sortedTypes.map((it) => {
    if (it === `check-in`) {
      return `${EmojiMap[`check`]} ${it.toUpperCase()}`;
    }
    return `${EmojiMap[it]} ${it.toUpperCase()}`;
  });

  return new Chart(transportCtx, {
    plugins: [ChartDataLabels],
    type: `horizontalBar`,
    data: {
      labels,
      datasets: [{
        data: sortedNumberOfRepetitions,
        backgroundColor: `#ffffff`,
        hoverBackgroundColor: `#ffffff`,
        anchor: `start`,
        barThickness: 44,
        minBarLength: 50,
      }]
    },
    options: {
      plugins: {
        datalabels: {
          font: {
            size: 13
          },
          color: `#000000`,
          anchor: `end`,
          align: `start`,
          formatter: (val) => `${val}x`
        }
      },
      title: {
        display: true,
        text: `TRANSPORT`,
        fontColor: `#000000`,
        fontSize: 23,
        position: `left`
      },
      scales: {
        yAxes: [{
          ticks: {
            fontColor: `#000000`,
            padding: 5,
            fontSize: 13,
          },
          gridLines: {
            display: false,
            drawBorder: false
          },
        }],
        xAxes: [{
          ticks: {
            display: false,
            beginAtZero: true,
          },
          gridLines: {
            display: false,
            drawBorder: false
          },
        }],
      },
      legend: {
        display: false
      },
      tooltips: {
        enabled: false,
      }
    }
  });
};

const renderTimeChart = (timeCtx, points) => {
  points.sort((a, b) => ((b.dateTo - b.dateFrom) - (a.dateTo - a.dateFrom)));

  const totalTimeSpend = points.map((it) => {
    return it.dateTo - it.dateFrom;
  });

  const labels = points.map((it) => {
    if (it.type === `check-in`) {
      return `${EmojiMap[`check`]} ${it.type.toUpperCase()} ${it.destination.toUpperCase()}`;
    }
    return `${EmojiMap[it.type]} ${it.type.toUpperCase()} ${isActivitys(it.type) ? `IN ` : `TO `}${it.destination.toUpperCase()}`;
  });

  return new Chart(timeCtx, {
    plugins: [ChartDataLabels],
    type: `horizontalBar`,
    data: {
      labels,
      datasets: [{
        data: totalTimeSpend,
        backgroundColor: `#ffffff`,
        hoverBackgroundColor: `#ffffff`,
        anchor: `start`
      }]
    },
    options: {
      plugins: {
        datalabels: {
          font: {
            size: 13
          },
          color: `#000000`,
          anchor: `end`,
          align: `start`,
          formatter: (val) => `${Math.floor((val / 1000 / 60 / 60))}H`
        }
      },
      title: {
        display: true,
        text: `TIME SPENT`,
        fontColor: `#000000`,
        fontSize: 23,
        position: `left`,
        barThickness: 44,
        minBarLength: 50,
      },
      scales: {
        yAxes: [{
          ticks: {
            fontColor: `#000000`,
            padding: 5,
            fontSize: 13,
          },
          gridLines: {
            display: false,
            drawBorder: false
          },
        }],
        xAxes: [{
          ticks: {
            display: false,
            beginAtZero: true,
          },
          gridLines: {
            display: false,
            drawBorder: false
          },
        }],
      },
      legend: {
        display: false
      },
      tooltips: {
        enabled: false,
      }
    }
  });
};

const createStatisticsTemplate = () => {
  return (`<section class="statistics">
    <h2 class="visually-hidden">Trip statistics</h2>

    <div class="statistics__item statistics__item--money">
      <canvas class="statistics__chart  statistics__chart--money" width="900"></canvas>
    </div>

    <div class="statistics__item statistics__item--transport">
      <canvas class="statistics__chart  statistics__chart--transport" width="900"></canvas>
    </div>

    <div class="statistics__item statistics__item--time-spend">
      <canvas class="statistics__chart  statistics__chart--time" width="900"></canvas>
    </div>
  </section>`);
};

class Statistics extends AbstractSmartComponent {
  constructor(pointsModel) {
    super();

    this._moneyChart = null;
    this._transportChart = null;
    this._timeChart = null;
    this._pointsModel = pointsModel;

    this._onDataChange = this._onDataChange.bind(this);
    this._pointsModel.setOnDataChange(this._onDataChange);

    this._renderCharts();
  }

  getTemplate() {
    return createStatisticsTemplate();
  }

  _renderCharts() {
    const element = this.getElement();

    const moneyCtx = element.querySelector(`.statistics__chart--money`);
    const transportCtx = element.querySelector(`.statistics__chart--transport`);
    const timeSpendCtx = element.querySelector(`.statistics__chart--time`);

    moneyCtx.height = BAR_HEIGHT * 8;
    transportCtx.height = BAR_HEIGHT * 8;
    timeSpendCtx.height = BAR_HEIGHT * 16;

    this._moneyChart = renderMoneyChart(moneyCtx, this._pointsModel.getAllPoints());
    this._transportChart = renderTransportChart(transportCtx, this._pointsModel.getAllPoints());
    this._timeChart = renderTimeChart(timeSpendCtx, this._pointsModel.getAllPoints());
  }

  rerender() {
    super.rerender();
    this._renderCharts();
  }

  recoveryListeners() {}
  _onDataChange() {
    this.rerender();
    this.hide();
  }
}

export default Statistics;
