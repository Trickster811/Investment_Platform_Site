"use strict";
!(function (NioApp, $) {
  var totalSales = {
      labels: [
        "01 Jan",
        "02 Jan",
        "03 Jan",
        "04 Jan",
        "05 Jan",
        "06 Jan",
        "07 Jan",
        "08 Jan",
        "09 Jan",
        "10 Jan",
        "11 Jan",
        "12 Jan",
        "13 Jan",
        "14 Jan",
        "15 Jan",
        "16 Jan",
        "17 Jan",
        "18 Jan",
        "19 Jan",
        "20 Jan",
        "21 Jan",
        "22 Jan",
        "23 Jan",
        "24 Jan",
        "25 Jan",
        "26 Jan",
        "27 Jan",
        "28 Jan",
        "29 Jan",
        "30 Jan",
      ],
      dataUnit: "Sales",
      lineTension: 0.3,
      datasets: [
        {
          label: "Sales",
          color: "#9d72ff",
          background: NioApp.hexRGB("#9d72ff", 0.25),
          data: [
            130, 105, 125, 115, 110, 95, 131, 110, 115, 120, 111, 97, 113, 107,
            122, 100, 85, 110, 130, 107, 90, 105, 123, 115, 100, 117, 125, 95,
            137, 101,
          ],
        },
      ],
    },
    totalOrders = {
      labels: [
        "01 Jan",
        "02 Jan",
        "03 Jan",
        "04 Jan",
        "05 Jan",
        "06 Jan",
        "07 Jan",
        "08 Jan",
        "09 Jan",
        "10 Jan",
        "11 Jan",
        "12 Jan",
        "13 Jan",
        "14 Jan",
        "15 Jan",
        "16 Jan",
        "17 Jan",
        "18 Jan",
        "19 Jan",
        "20 Jan",
        "21 Jan",
        "22 Jan",
        "23 Jan",
        "24 Jan",
        "25 Jan",
        "26 Jan",
        "27 Jan",
        "28 Jan",
        "29 Jan",
        "30 Jan",
      ],
      dataUnit: "Orders",
      lineTension: 0.3,
      datasets: [
        {
          label: "Orders",
          color: "#7de1f8",
          background: NioApp.hexRGB("#7de1f8", 0.25),
          data: [
            85, 125, 105, 115, 130, 106, 141, 110, 95, 120, 111, 105, 113, 107,
            122, 100, 95, 110, 120, 107, 100, 105, 123, 115, 110, 117, 125, 75,
            95, 101,
          ],
        },
      ],
    },
    totalCustomers = {
      labels: [
        "01 Jan",
        "02 Jan",
        "03 Jan",
        "04 Jan",
        "05 Jan",
        "06 Jan",
        "07 Jan",
        "08 Jan",
        "09 Jan",
        "10 Jan",
        "11 Jan",
        "12 Jan",
        "13 Jan",
        "14 Jan",
        "15 Jan",
        "16 Jan",
        "17 Jan",
        "18 Jan",
        "19 Jan",
        "20 Jan",
        "21 Jan",
        "22 Jan",
        "23 Jan",
        "24 Jan",
        "25 Jan",
        "26 Jan",
        "27 Jan",
        "28 Jan",
        "29 Jan",
        "30 Jan",
      ],
      dataUnit: "Customers",
      lineTension: 0.3,
      datasets: [
        {
          label: "Customers",
          color: "#83bcff",
          background: NioApp.hexRGB("#83bcff", 0.25),
          data: [
            92, 105, 125, 85, 110, 106, 131, 105, 110, 115, 135, 105, 120, 85,
            122, 100, 125, 110, 120, 125, 85, 105, 123, 115, 90, 117, 125, 100,
            95, 65,
          ],
        },
      ],
    };
  function ecommerceLineS1(selector, set_data) {
    var $selector = $(selector || ".ecommerce-line-chart-s1");
    $selector.each(function () {
      for (
        var $self = $(this),
          _self_id = $self.attr("id"),
          _get_data = void 0 === set_data ? eval(_self_id) : set_data,
          selectCanvas = document.getElementById(_self_id).getContext("2d"),
          chart_data = [],
          i = 0;
        i < _get_data.datasets.length;
        i++
      )
        chart_data.push({
          label: _get_data.datasets[i].label,
          tension: _get_data.lineTension,
          backgroundColor: _get_data.datasets[i].background,
          borderWidth: 2,
          borderColor: _get_data.datasets[i].color,
          pointBorderColor: "transparent",
          pointBackgroundColor: "transparent",
          pointHoverBackgroundColor: "#fff",
          pointHoverBorderColor: _get_data.datasets[i].color,
          pointBorderWidth: 2,
          pointHoverRadius: 4,
          pointHoverBorderWidth: 2,
          pointRadius: 4,
          pointHitRadius: 4,
          data: _get_data.datasets[i].data,
        });
      var chart = new Chart(selectCanvas, {
        type: "line",
        data: { labels: _get_data.labels, datasets: chart_data },
        options: {
          legend: {
            display: _get_data.legend || !1,
            rtl: NioApp.State.isRTL,
            labels: { boxWidth: 12, padding: 20, fontColor: "#6783b8" },
          },
          maintainAspectRatio: !1,
          tooltips: {
            enabled: !0,
            rtl: NioApp.State.isRTL,
            callbacks: {
              title: function (a, t) {
                return t.labels[a[0].index];
              },
              label: function (a, t) {
                return (
                  t.datasets[a.datasetIndex].data[a.index] +
                  " " +
                  _get_data.dataUnit
                );
              },
            },
            backgroundColor: "#1c2b46",
            titleFontSize: 10,
            titleFontColor: "#fff",
            titleMarginBottom: 4,
            bodyFontColor: "#fff",
            bodyFontSize: 10,
            bodySpacing: 4,
            yPadding: 6,
            xPadding: 6,
            footerMarginTop: 0,
            displayColors: !1,
          },
          scales: {
            yAxes: [
              {
                display: !1,
                ticks: {
                  beginAtZero: !0,
                  fontSize: 12,
                  fontColor: "#9eaecf",
                  padding: 0,
                },
                gridLines: {
                  color: NioApp.hexRGB("#526484", 0.2),
                  tickMarkLength: 0,
                  zeroLineColor: NioApp.hexRGB("#526484", 0.2),
                },
              },
            ],
            xAxes: [
              {
                display: !1,
                ticks: {
                  fontSize: 12,
                  fontColor: "#9eaecf",
                  source: "auto",
                  padding: 0,
                  reverse: NioApp.State.isRTL,
                },
                gridLines: {
                  color: "transparent",
                  tickMarkLength: 0,
                  zeroLineColor: NioApp.hexRGB("#526484", 0.2),
                  offsetGridLines: !0,
                },
              },
            ],
          },
        },
      });
    });
  }
  NioApp.coms.docReady.push(function () {
    ecommerceLineS1();
  });
  var storeVisitors = {
    labels: [
      "01 Jan",
      "02 Jan",
      "03 Jan",
      "04 Jan",
      "05 Jan",
      "06 Jan",
      "07 Jan",
      "08 Jan",
      "09 Jan",
      "10 Jan",
      "11 Jan",
      "12 Jan",
      "13 Jan",
      "14 Jan",
      "15 Jan",
      "16 Jan",
      "17 Jan",
      "18 Jan",
      "19 Jan",
      "20 Jan",
      "21 Jan",
      "22 Jan",
      "23 Jan",
      "24 Jan",
      "25 Jan",
      "26 Jan",
      "27 Jan",
      "28 Jan",
      "29 Jan",
      "30 Jan",
    ],
    dataUnit: "People",
    lineTension: 0.1,
    datasets: [
      {
        label: "Current Month",
        color: "#9d72ff",
        dash: 0,
        background: "transparent",
        data: [
          4110, 4220, 4810, 5480, 4600, 5670, 6660, 4830, 5590, 5730, 4790,
          4950, 5100, 5800, 5950, 5850, 5950, 4450, 4900, 8e3, 7200, 7250, 7900,
          8950, 6300, 7200, 7250, 7650, 6950, 4750,
        ],
      },
    ],
  };
  function ecommerceLineS2(selector, set_data) {
    var $selector = $(selector || ".ecommerce-line-chart-s2");
    $selector.each(function () {
      for (
        var $self = $(this),
          _self_id = $self.attr("id"),
          _get_data = void 0 === set_data ? eval(_self_id) : set_data,
          selectCanvas = document.getElementById(_self_id).getContext("2d"),
          chart_data = [],
          i = 0;
        i < _get_data.datasets.length;
        i++
      )
        chart_data.push({
          label: _get_data.datasets[i].label,
          tension: _get_data.lineTension,
          backgroundColor: _get_data.datasets[i].background,
          borderWidth: 2,
          borderDash: _get_data.datasets[i].dash,
          borderColor: _get_data.datasets[i].color,
          pointBorderColor: "transparent",
          pointBackgroundColor: "transparent",
          pointHoverBackgroundColor: "#fff",
          pointHoverBorderColor: _get_data.datasets[i].color,
          pointBorderWidth: 2,
          pointHoverRadius: 4,
          pointHoverBorderWidth: 2,
          pointRadius: 4,
          pointHitRadius: 4,
          data: _get_data.datasets[i].data,
        });
      var chart = new Chart(selectCanvas, {
        type: "line",
        data: { labels: _get_data.labels, datasets: chart_data },
        options: {
          legend: {
            display: _get_data.legend || !1,
            rtl: NioApp.State.isRTL,
            labels: { boxWidth: 12, padding: 20, fontColor: "#6783b8" },
          },
          maintainAspectRatio: !1,
          tooltips: {
            enabled: !0,
            rtl: NioApp.State.isRTL,
            callbacks: {
              title: function (a, t) {
                return t.labels[a[0].index];
              },
              label: function (a, t) {
                return t.datasets[a.datasetIndex].data[a.index];
              },
            },
            backgroundColor: "#1c2b46",
            titleFontSize: 13,
            titleFontColor: "#fff",
            titleMarginBottom: 6,
            bodyFontColor: "#fff",
            bodyFontSize: 12,
            bodySpacing: 4,
            yPadding: 10,
            xPadding: 10,
            footerMarginTop: 0,
            displayColors: !1,
          },
          scales: {
            yAxes: [
              {
                display: !0,
                position: NioApp.State.isRTL ? "right" : "left",
                ticks: {
                  fontSize: 12,
                  fontColor: "#9eaecf",
                  padding: 8,
                  stepSize: 2400,
                  display: !1,
                },
                gridLines: {
                  color: NioApp.hexRGB("#526484", 0.2),
                  tickMarkLength: 0,
                  zeroLineColor: NioApp.hexRGB("#526484", 0.2),
                },
              },
            ],
            xAxes: [
              {
                display: !1,
                ticks: {
                  fontSize: 12,
                  fontColor: "#9eaecf",
                  source: "auto",
                  padding: 0,
                  reverse: NioApp.State.isRTL,
                },
                gridLines: {
                  color: "transparent",
                  tickMarkLength: 0,
                  zeroLineColor: "transparent",
                  offsetGridLines: !0,
                },
              },
            ],
          },
        },
      });
    });
  }
  NioApp.coms.docReady.push(function () {
    ecommerceLineS2();
  });
  var todayOrders = {
      labels: [
        "12AM - 02AM",
        "02AM - 04AM",
        "04AM - 06AM",
        "06AM - 08AM",
        "08AM - 10AM",
        "10AM - 12PM",
        "12PM - 02PM",
        "02PM - 04PM",
        "04PM - 06PM",
        "06PM - 08PM",
        "08PM - 10PM",
        "10PM - 12PM",
      ],
      dataUnit: "Orders",
      lineTension: 0.3,
      datasets: [
        {
          label: "Orders",
          color: "#854fff",
          background: "transparent",
          data: [92, 105, 125, 85, 110, 106, 131, 105, 110, 131, 105, 110],
        },
      ],
    },
    todayRevenue = {
      labels: [
        "12AM - 02AM",
        "02AM - 04AM",
        "04AM - 06AM",
        "06AM - 08AM",
        "08AM - 10AM",
        "10AM - 12PM",
        "12PM - 02PM",
        "02PM - 04PM",
        "04PM - 06PM",
        "06PM - 08PM",
        "08PM - 10PM",
        "10PM - 12PM",
      ],
      dataUnit: "Orders",
      lineTension: 0.3,
      datasets: [
        {
          label: "Revenue",
          color: "#33d895",
          background: "transparent",
          data: [92, 105, 125, 85, 110, 106, 131, 105, 110, 131, 105, 110],
        },
      ],
    },
    todayCustomers = {
      labels: [
        "12AM - 02AM",
        "02AM - 04AM",
        "04AM - 06AM",
        "06AM - 08AM",
        "08AM - 10AM",
        "10AM - 12PM",
        "12PM - 02PM",
        "02PM - 04PM",
        "04PM - 06PM",
        "06PM - 08PM",
        "08PM - 10PM",
        "10PM - 12PM",
      ],
      dataUnit: "Orders",
      lineTension: 0.3,
      datasets: [
        {
          label: "Customers",
          color: "#ff63a5",
          background: "transparent",
          data: [92, 105, 125, 85, 110, 106, 131, 105, 110, 131, 105, 110],
        },
      ],
    },
    todayVisitors = {
      labels: [
        "12AM - 02AM",
        "02AM - 04AM",
        "04AM - 06AM",
        "06AM - 08AM",
        "08AM - 10AM",
        "10AM - 12PM",
        "12PM - 02PM",
        "02PM - 04PM",
        "04PM - 06PM",
        "06PM - 08PM",
        "08PM - 10PM",
        "10PM - 12PM",
      ],
      dataUnit: "Orders",
      lineTension: 0.3,
      datasets: [
        {
          label: "Visitors",
          color: "#559bfb",
          background: "transparent",
          data: [92, 105, 125, 85, 110, 106, 131, 105, 110, 131, 105, 110],
        },
      ],
    };
  function ecommerceLineS3(selector, set_data) {
    var $selector = $(selector || ".ecommerce-line-chart-s3");
    $selector.each(function () {
      for (
        var $self = $(this),
          _self_id = $self.attr("id"),
          _get_data = void 0 === set_data ? eval(_self_id) : set_data,
          selectCanvas = document.getElementById(_self_id).getContext("2d"),
          chart_data = [],
          i = 0;
        i < _get_data.datasets.length;
        i++
      )
        chart_data.push({
          label: _get_data.datasets[i].label,
          tension: _get_data.lineTension,
          backgroundColor: _get_data.datasets[i].background,
          borderWidth: 2,
          borderColor: _get_data.datasets[i].color,
          pointBorderColor: "transparent",
          pointBackgroundColor: "transparent",
          pointHoverBackgroundColor: "#fff",
          pointHoverBorderColor: _get_data.datasets[i].color,
          pointBorderWidth: 2,
          pointHoverRadius: 4,
          pointHoverBorderWidth: 2,
          pointRadius: 4,
          pointHitRadius: 4,
          data: _get_data.datasets[i].data,
        });
      var chart = new Chart(selectCanvas, {
        type: "line",
        data: { labels: _get_data.labels, datasets: chart_data },
        options: {
          legend: {
            display: _get_data.legend || !1,
            rtl: NioApp.State.isRTL,
            labels: { boxWidth: 12, padding: 20, fontColor: "#6783b8" },
          },
          maintainAspectRatio: !1,
          tooltips: {
            enabled: !0,
            rtl: NioApp.State.isRTL,
            callbacks: {
              title: function (a, t) {
                return !1;
              },
              label: function (a, t) {
                return (
                  t.datasets[a.datasetIndex].data[a.index] +
                  " " +
                  _get_data.dataUnit
                );
              },
            },
            backgroundColor: "#1c2b46",
            titleFontSize: 8,
            titleFontColor: "#fff",
            titleMarginBottom: 4,
            bodyFontColor: "#fff",
            bodyFontSize: 8,
            bodySpacing: 4,
            yPadding: 6,
            xPadding: 6,
            footerMarginTop: 0,
            displayColors: !1,
          },
          scales: {
            yAxes: [
              {
                display: !1,
                ticks: {
                  beginAtZero: !1,
                  fontSize: 12,
                  fontColor: "#9eaecf",
                  padding: 0,
                },
                gridLines: {
                  color: NioApp.hexRGB("#526484", 0.2),
                  tickMarkLength: 0,
                  zeroLineColor: NioApp.hexRGB("#526484", 0.2),
                },
              },
            ],
            xAxes: [
              {
                display: !1,
                ticks: {
                  fontSize: 12,
                  fontColor: "#9eaecf",
                  source: "auto",
                  padding: 0,
                  reverse: NioApp.State.isRTL,
                },
                gridLines: {
                  color: "transparent",
                  tickMarkLength: 0,
                  zeroLineColor: NioApp.hexRGB("#526484", 0.2),
                  offsetGridLines: !0,
                },
              },
            ],
          },
        },
      });
    });
  }
  NioApp.coms.docReady.push(function () {
    ecommerceLineS3();
  });
  var salesStatistics = {
    labels: [
      "01 Jan",
      "02 Jan",
      "03 Jan",
      "04 Jan",
      "05 Jan",
      "06 Jan",
      "07 Jan",
      "08 Jan",
      "09 Jan",
      "10 Jan",
      "11 Jan",
      "12 Jan",
      "13 Jan",
      "14 Jan",
      "15 Jan",
      "16 Jan",
      "17 Jan",
      "18 Jan",
      "19 Jan",
      "20 Jan",
      "21 Jan",
      "22 Jan",
      "23 Jan",
      "24 Jan",
      "25 Jan",
      "26 Jan",
      "27 Jan",
      "28 Jan",
      "29 Jan",
      "30 Jan",
    ],
    dataUnit: "People",
    lineTension: 0.4,
    datasets: [
      {
        label: "Total orders",
        color: "#9d72ff",
        dash: 0,
        background: NioApp.hexRGB("#9d72ff", 0.15),
        data: [
          3710, 4820, 4810, 5480, 5300, 5670, 6660, 4830, 5590, 5730, 4790,
          4950, 5100, 5800, 5950, 5850, 5950, 4450, 4900, 8e3, 7200, 7250, 7900,
          8950, 6300, 7200, 7250, 7650, 6950, 4750,
        ],
      },
      {
        label: "Canceled orders",
        color: "#eb6459",
        dash: [5],
        background: "transparent",
        data: [
          110, 220, 810, 480, 600, 670, 660, 830, 590, 730, 790, 950, 100, 800,
          950, 850, 950, 450, 900, 0, 200, 250, 900, 950, 300, 200, 250, 650,
          950, 750,
        ],
      },
    ],
  };
  function ecommerceLineS4(selector, set_data) {
    var $selector = $(selector || ".ecommerce-line-chart-s4");
    $selector.each(function () {
      for (
        var $self = $(this),
          _self_id = $self.attr("id"),
          _get_data = void 0 === set_data ? eval(_self_id) : set_data,
          selectCanvas = document.getElementById(_self_id).getContext("2d"),
          chart_data = [],
          i = 0;
        i < _get_data.datasets.length;
        i++
      )
        chart_data.push({
          label: _get_data.datasets[i].label,
          tension: _get_data.lineTension,
          backgroundColor: _get_data.datasets[i].background,
          borderWidth: 2,
          borderDash: _get_data.datasets[i].dash,
          borderColor: _get_data.datasets[i].color,
          pointBorderColor: "transparent",
          pointBackgroundColor: "transparent",
          pointHoverBackgroundColor: "#fff",
          pointHoverBorderColor: _get_data.datasets[i].color,
          pointBorderWidth: 2,
          pointHoverRadius: 4,
          pointHoverBorderWidth: 2,
          pointRadius: 4,
          pointHitRadius: 4,
          data: _get_data.datasets[i].data,
        });
      var chart = new Chart(selectCanvas, {
        type: "line",
        data: { labels: _get_data.labels, datasets: chart_data },
        options: {
          legend: {
            display: _get_data.legend || !1,
            rtl: NioApp.State.isRTL,
            labels: { boxWidth: 12, padding: 20, fontColor: "#6783b8" },
          },
          maintainAspectRatio: !1,
          tooltips: {
            enabled: !0,
            rtl: NioApp.State.isRTL,
            callbacks: {
              title: function (a, t) {
                return t.labels[a[0].index];
              },
              label: function (a, t) {
                return t.datasets[a.datasetIndex].data[a.index];
              },
            },
            backgroundColor: "#1c2b46",
            titleFontSize: 13,
            titleFontColor: "#fff",
            titleMarginBottom: 6,
            bodyFontColor: "#fff",
            bodyFontSize: 12,
            bodySpacing: 4,
            yPadding: 10,
            xPadding: 10,
            footerMarginTop: 0,
            displayColors: !1,
          },
          scales: {
            yAxes: [
              {
                display: !0,
                stacked: _get_data.stacked || !1,
                position: NioApp.State.isRTL ? "right" : "left",
                ticks: {
                  beginAtZero: !0,
                  fontSize: 11,
                  fontColor: "#9eaecf",
                  padding: 10,
                  callback: function (a, t, e) {
                    return "$ " + a;
                  },
                  min: 0,
                  stepSize: 3e3,
                },
                gridLines: {
                  color: NioApp.hexRGB("#526484", 0.2),
                  tickMarkLength: 0,
                  zeroLineColor: NioApp.hexRGB("#526484", 0.2),
                },
              },
            ],
            xAxes: [
              {
                display: !1,
                stacked: _get_data.stacked || !1,
                ticks: {
                  fontSize: 9,
                  fontColor: "#9eaecf",
                  source: "auto",
                  padding: 10,
                  reverse: NioApp.State.isRTL,
                },
                gridLines: {
                  color: "transparent",
                  tickMarkLength: 0,
                  zeroLineColor: "transparent",
                },
              },
            ],
          },
        },
      });
    });
  }
  NioApp.coms.docReady.push(function () {
    ecommerceLineS4();
  });
  var averargeOrder = {
    labels: [
      "01 Jan",
      "02 Jan",
      "03 Jan",
      "04 Jan",
      "05 Jan",
      "06 Jan",
      "07 Jan",
      "08 Jan",
      "09 Jan",
      "10 Jan",
      "11 Jan",
      "12 Jan",
      "13 Jan",
      "14 Jan",
      "15 Jan",
      "16 Jan",
      "17 Jan",
      "18 Jan",
      "19 Jan",
      "20 Jan",
      "21 Jan",
      "22 Jan",
      "23 Jan",
      "24 Jan",
      "25 Jan",
      "26 Jan",
      "27 Jan",
      "28 Jan",
      "29 Jan",
      "30 Jan",
    ],
    dataUnit: "People",
    lineTension: 0.1,
    datasets: [
      {
        label: "Active Users",
        color: "#b695ff",
        background: "#b695ff",
        data: [
          1110, 1220, 1310, 980, 900, 770, 1060, 830, 690, 730, 790, 950, 1100,
          800, 1250, 850, 950, 450, 900, 1e3, 1200, 1250, 900, 950, 1300, 1200,
          1250, 650, 950, 750,
        ],
      },
    ],
  };
  function ecommerceBarS1(selector, set_data) {
    var $selector = $(selector || ".ecommerce-bar-chart-s1");
    $selector.each(function () {
      for (
        var $self = $(this),
          _self_id = $self.attr("id"),
          _get_data = void 0 === set_data ? eval(_self_id) : set_data,
          selectCanvas = document.getElementById(_self_id).getContext("2d"),
          chart_data = [],
          i = 0;
        i < _get_data.datasets.length;
        i++
      )
        chart_data.push({
          label: _get_data.datasets[i].label,
          tension: _get_data.lineTension,
          backgroundColor: _get_data.datasets[i].background,
          borderWidth: 2,
          borderColor: _get_data.datasets[i].color,
          data: _get_data.datasets[i].data,
          barPercentage: 0.7,
          categoryPercentage: 0.7,
        });
      var chart = new Chart(selectCanvas, {
        type: "bar",
        data: { labels: _get_data.labels, datasets: chart_data },
        options: {
          legend: {
            display: _get_data.legend || !1,
            rtl: NioApp.State.isRTL,
            labels: { boxWidth: 12, padding: 20, fontColor: "#6783b8" },
          },
          maintainAspectRatio: !1,
          tooltips: {
            enabled: !0,
            rtl: NioApp.State.isRTL,
            callbacks: {
              title: function (a, t) {
                return !1;
              },
              label: function (a, t) {
                return t.datasets[a.datasetIndex].data[a.index];
              },
            },
            backgroundColor: "#1c2b46",
            titleFontSize: 9,
            titleFontColor: "#fff",
            titleMarginBottom: 6,
            bodyFontColor: "#fff",
            bodyFontSize: 9,
            bodySpacing: 4,
            yPadding: 6,
            xPadding: 6,
            footerMarginTop: 0,
            displayColors: !1,
          },
          scales: {
            yAxes: [
              {
                display: !0,
                position: NioApp.State.isRTL ? "right" : "left",
                ticks: {
                  beginAtZero: !1,
                  fontSize: 12,
                  fontColor: "#9eaecf",
                  padding: 0,
                  display: !1,
                  stepSize: 100,
                },
                gridLines: {
                  color: NioApp.hexRGB("#526484", 0.2),
                  tickMarkLength: 0,
                  zeroLineColor: NioApp.hexRGB("#526484", 0.2),
                },
              },
            ],
            xAxes: [
              {
                display: !1,
                ticks: {
                  fontSize: 12,
                  fontColor: "#9eaecf",
                  source: "auto",
                  padding: 0,
                  reverse: NioApp.State.isRTL,
                },
                gridLines: {
                  color: "transparent",
                  tickMarkLength: 0,
                  zeroLineColor: "transparent",
                  offsetGridLines: !0,
                },
              },
            ],
          },
        },
      });
    });
  }
  NioApp.coms.docReady.push(function () {
    ecommerceBarS1();
  });
  var trafficSources = {
      labels: ["Organic Search", "Social Media", "Referrals", "Others"],
      dataUnit: "People",
      legend: !1,
      datasets: [
        {
          borderColor: "#fff",
          background: ["#b695ff", "#b8acff", "#ffa9ce", "#f9db7b"],
          data: [4305, 859, 482, 138],
        },
      ],
    },
    orderStatistics = {
      labels: ["Completed", "Processing", "Canclled"],
      dataUnit: "People",
      legend: !1,
      datasets: [
        {
          borderColor: "#fff",
          background: ["#816bff", "#13c9f2", "#ff82b7"],
          data: [4305, 859, 482],
        },
      ],
    };
  function ecommerceDoughnutS1(selector, set_data) {
    var $selector = $(selector || ".ecommerce-doughnut-s1");
    $selector.each(function () {
      for (
        var $self = $(this),
          _self_id = $self.attr("id"),
          _get_data = void 0 === set_data ? eval(_self_id) : set_data,
          selectCanvas = document.getElementById(_self_id).getContext("2d"),
          chart_data = [],
          i = 0;
        i < _get_data.datasets.length;
        i++
      )
        chart_data.push({
          backgroundColor: _get_data.datasets[i].background,
          borderWidth: 2,
          borderColor: _get_data.datasets[i].borderColor,
          hoverBorderColor: _get_data.datasets[i].borderColor,
          data: _get_data.datasets[i].data,
        });
      var chart = new Chart(selectCanvas, {
        type: "doughnut",
        data: { labels: _get_data.labels, datasets: chart_data },
        options: {
          legend: {
            display: _get_data.legend || !1,
            rtl: NioApp.State.isRTL,
            labels: { boxWidth: 12, padding: 20, fontColor: "#6783b8" },
          },
          rotation: -1.5,
          cutoutPercentage: 70,
          maintainAspectRatio: !1,
          tooltips: {
            enabled: !0,
            rtl: NioApp.State.isRTL,
            callbacks: {
              title: function (a, t) {
                return t.labels[a[0].index];
              },
              label: function (a, t) {
                return (
                  t.datasets[a.datasetIndex].data[a.index] +
                  " " +
                  _get_data.dataUnit
                );
              },
            },
            backgroundColor: "#1c2b46",
            titleFontSize: 13,
            titleFontColor: "#fff",
            titleMarginBottom: 6,
            bodyFontColor: "#fff",
            bodyFontSize: 12,
            bodySpacing: 4,
            yPadding: 10,
            xPadding: 10,
            footerMarginTop: 0,
            displayColors: !1,
          },
        },
      });
    });
  }
  NioApp.coms.docReady.push(function () {
    ecommerceDoughnutS1();
  });
})(NioApp, jQuery);
