<template #newpage>
  <div class="flex h-screen w-screen">
   <div class="h-full border-r bg-gray-50">
     <AppSidebar />
   </div>
   <div class="flex-1 flex flex-col h-full overflow-auto">
    <div class="h-full w-full flex flex-col">
     <AppHeader />
     <slot />
     <div class="overflow-auto">
                    <div class="flex gap-[12px] px-5 py-3">
                        <div class="flex-[0_0_calc(25%_-_12px)] border rounded-lg p-5 h-[125px] w-[245px]">
                            <div class="card">
                                <div class="card-body">
                                    <p class="text-xs">AVERAGE MONTHLY BUSINESS</p>
                                    <h2 v-if="grandTotal !== null" class="card-number font-semibold text-3xl pt-3">
                                        {{
                                            formatAmount(grandTotal)
                                        }}</h2>
                                    <p v-else>0</p>
                                </div>
                            </div>
                        </div>
                        <div class="flex-[0_0_calc(25%_-_12px)] border rounded-lg p-5 h-[125px] w-[245px]">
                            <div class="card">
                                <div class="card-body">
                                    <p class="text-xs">OPEN RFQ</p>
                                    <h2 v-if="openRfqs !== null" class="card-number font-semibold text-3xl pt-3">{{
                                        openRfqs }}</h2>
                                    <p v-else>0</p>
                                </div>
                            </div>
                        </div>
                        <div class="flex-[0_0_calc(25%_-_12px)] border rounded-lg p-5 h-[125px] w-[245px]">
                            <div class="card">
                                <div class="card-body">
                                    <p class="text-xs">PENDING INVOICES</p>
                                    <h2 v-if="pendingInvoice !== null" class="card-number font-semibold text-3xl pt-3">
                                        {{
                                            pendingInvoice }}</h2>
                                    <p v-else>Loading...</p>
                                </div>
                            </div>
                        </div>
                        <div class="flex-[0_0_calc(25%_-_12px)] border rounded-lg p-5 h-[125px] w-[245px]">
                            <div class="card">
                                <div class="card-body">
                                    <p class="text-xs">OPEN ORDERS</p>
                                    <h2 v-if="pendingInwards !== null" class="card-number font-semibold text-3xl pt-3">
                                        {{
                                            pendingInwards }}</h2>
                                    <p v-else>Loading...</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="flex gap-[12px] px-5 pb-3">
                        <div
                            class="chart-container border rounded-xl h-[300px] w-[510px] p-5 flex-[0_0_calc(50%_-_12px)]">
                            <Line :data="lineChartData" :options="lineChartOptions" />
                        </div>
                        <div
                            class="chart-container border rounded-xl h-[300px] w-[510px] p-5 flex-[0_0_calc(50%_-_12px)]">
                            <Bar :data="topSoldItemsChartData" :options="topSoldItemsChartOptions" />
                        </div>
                    </div>

                    <div class="flex gap-[12px] px-5 pb-3">
                        <div
                            class="chart-container border rounded-xl w-[510px] h-[300px] flex items-center justify-center flex-[0_0_calc(50%_-_12px)]">
                            <Doughnut :data="chartData" :options="chartOptions" />
                        </div>
                        <div
                            class="chart-container border rounded-xl w-[510px] h-[300px] flex items-center justify-center flex-[0_0_calc(50%_-_12px)]">
                            <Doughnut :data="materialRequestChartData" :options="materialRequestChartOptions" />
                        </div>
                    </div>
              </div>
</div>
</div>
</div>
</template>

<script setup>
import AppSidebar from '@/components/Layouts/AppSidebar.vue';
import AppHeader from '@/components/Layouts/AppHeader.vue';
import {  ref,onMounted } from 'vue';
import { Doughnut, Line, Bar } from 'vue-chartjs';
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement, LineElement, CategoryScale, LinearScale, PointElement, BarElement } from 'chart.js';

ChartJS.register(Title, Tooltip, Legend, ArcElement, LineElement, CategoryScale, LinearScale, PointElement, BarElement);

const grandTotal = ref(null);
const pendingInvoice = ref(null);
const pendingInwards = ref(null);
const openRfqs = ref(null);


// Number card1
const fetchGrandTotal = async () => {
    try {
        const response = await fetch('/api/method/go1_vendor.api.get_purchase_order_grand_total');
        const data = await response.json();

        if (data.message && typeof data.message.total_grand_total === 'number') {
            grandTotal.value = data.message.total_grand_total;
            
        } else {
            console.error('Unexpected response:', data);
        }
    } catch (error) {
        console.error('Error fetching grand total:', error);
    }
};

const formatAmount = (amount) => {
    const formatter = new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    });
    return formatter.format(amount);
};
// Number card2
const fetchOpenRfqs = async () => {
    
    try {
        const response = await fetch('/api/method/go1_vendor.api.get_pending_quotation_count');
        const data = await response.json();

        if (data.message && typeof data.message.total_count === 'number') {
            openRfqs.value = data.message.total_count;
        } else {
            console.error('Unexpected response:', data);
        }
    } catch (error) {
        console.error('Error fetching purchase count:', error);
    }
};
// Number card3
const pendingInvoiceCount = async () => {
    try {
        const response = await fetch('/api/method/go1_vendor.api.get_pending_invoice');

        const data = await response.json();

        if (data.message && typeof data.message.total_count === 'number') {
             pendingInvoice.value = data.message.total_count;
        } else {
                console.error('Unexpected response:', data);
        }
    } catch (error) {
        console.error('Error fetching purchase count:', error);
    }
};
 //Number Card4
const fetchPendingInwards = async () => {
    try {
        const response = await fetch('/api/method/go1_vendor.api.get_pending_inwards');
        const data = await response.json();

        if (data.message && typeof data.message.total_count === 'number') {
            pendingInwards.value = data.message.total_count;
        } else {
            console.error('Unexpected response:', data);
        }
    } catch (error) {
        console.error('Error fetching purchase count:', error);
    }

};

// Line chart
const lineChartData = ref({
    labels: [],
    datasets: [
        {
            label: 'Grand Total by Month',
            data: [],
            borderColor: '#42a5f5',
            backgroundColor: 'rgba(66, 165, 245, 0.2)',
            fill: true,
        },
    ],
});

const lineChartOptions = {
    responsive: true,
    plugins: {
        legend: {
            display: false,
        },
        title: {
            display: true,
            text: 'Sales Order Trend',
            align: 'start',
            font: {
                size: 15,
            },
        },
    },
    scales: {
        x: {
            title: {
                display: false,
                text: 'Months',
            },
            grid: {
                display: true,
                drawOnChartArea: true,
                borderColor: '#e0e0e0',
                lineWidth: 1,
            },
            ticks: {
                callback: function (value, index) {
                    const financialYearMonths = ['Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar'];
                    return financialYearMonths[index % 12];
                },
            },
        },
        y: {
            title: {
                display: false,
                text: 'Total Grand Amount',
            },
            ticks: {
                beginAtZero: true,
                callback: function (value) {
                    if (value === 0) return '0';
                    if (value >= 1e7) return `${value / 1e7} Cr`;
                    if (value >= 1e5) return `${value / 1e5} L`;
                    if (value >= 1e3) return `${value / 1e3} k`;
                    return value.toFixed(0);
                },
            },
            grid: {
                display: true,
                drawOnChartArea: true,
                borderColor: '#e0e0e0',
                lineWidth: 1,
            },
            suggestedMin: 0,

        },
    },
};

const fetchMonthlyGrandTotal = async () => {
    try {
        const response = await fetch('/api/method/go1_vendor.api.get_monthly_grand_total');
        const data = await response.json();

        if (data.message) {
            const { labels, data: grandTotals } = data.message;

            const maxGrandTotal = Math.max(...grandTotals);
            let yAxisMaxValue, yAxisUnit, yAxisStepSize;

            if (maxGrandTotal >= 1e7) {
                yAxisUnit = 'Cr';
                yAxisMaxValue = Math.ceil(maxGrandTotal / 1e7) * 1e7;
                yAxisStepSize = 5e6;
            } else if (maxGrandTotal >= 1e5) {
                yAxisUnit = 'L';
                yAxisMaxValue = Math.ceil(maxGrandTotal / 1e5) * 1e5;
                yAxisStepSize = 5e5;
            } else if (maxGrandTotal >= 1e3) {
                yAxisUnit = 'k';
                yAxisMaxValue = Math.ceil(maxGrandTotal / 1e3) * 1e3;
                yAxisStepSize = 5e3;

            } else {
                yAxisUnit = '';
                yAxisMaxValue = Math.ceil(maxGrandTotal);
                yAxisStepSize = Math.ceil(yAxisMaxValue / 5);
            }


            lineChartData.value = {
                ...lineChartData.value,
                labels,
                datasets: [
                    {
                        ...lineChartData.value.datasets[0],
                        data: grandTotals,
                    },
                ],
            };


            lineChartOptions.scales.y.suggestedMax = yAxisMaxValue;
            lineChartOptions.scales.y.ticks.stepSize = yAxisStepSize;
            lineChartOptions.scales.y.ticks.callback = (value) => {
                if (value === 0) return '0';
                switch (yAxisUnit) {
                    case 'Cr':
                        return `${value / 1e7} ${yAxisUnit}`;
                    case 'L':
                        return `${value / 1e5} ${yAxisUnit}`;
                    case 'k':
                        return `${value / 1e3} ${yAxisUnit}`;
                    default:
                        return value.toString();
                }
            };

        } else {
            console.error('Unexpected response:', data);
        }
    } catch (error) {
        console.error('Error fetching monthly grand total:', error);
    }
};

// Bar chart 
const topSoldItemsChartData = ref({
    labels: [],
    datasets: [
        {
            label: 'Top Sold Items',
            data: [],
            backgroundColor: ['#3250a8', '#4ff52a'],
            hoverBackgroundColor: ['#3250a8', '#4ff52a'],
        },
    ],
});

const topSoldItemsChartOptions = {
    responsive: true,
    plugins: {
        legend: {
            display: false,
        },
        title: {
            display: true,
            text: 'Fast Moving Goods',
            align: 'start',
            font: {
                size: 15,
            },
        },
    },
    scales: {
        x: {
            title: {
                display: false,
                text: 'Item Code',
                },
                ticks: {
                    beginAtZero: true,
                },
        },
        y: {
            title: {
                display: false,
                text: 'Count',
            },
            ticks: {
                beginAtZero: true,
            },
        },
    },
};

const fetchTopSoldItems = async () => {
    try {
        const response = await fetch('/api/method/go1_vendor.api.get_top_sold_items');
        const data = await response.json();


        if (data.message && data.message.message && Array.isArray(data.message.message.items)) {
            const items = data.message.message.items;


            topSoldItemsChartData.value = {
                ...topSoldItemsChartData.value,
                labels: items.map((item) => item.item_name),
                datasets: [
                    {
                        ...topSoldItemsChartData.value.datasets[0],
                        data: items.map((item) => item.item_count),
                    },
                ],
            };
        } else {
            console.error('Unexpected response structure:', data);
        }
    } catch (error) {
         console.error('Error fetching top sold items:', error);
    }
};

// Doughnut Chart1
const chartData = ref({
    labels: ['Billed Amount', 'Amount To Bill'],
    datasets: [
        {
            label: 'Purchase Order Analysis',
            data: [0, 0],
            backgroundColor: ['#f797ca', '#4ff52a'],
            hoverBackgroundColor: ['#f797ca', '#4ff52a'],
        },
    ],
});

const chartOptions = {
    responsiveness: true,
    plugins: {
        legend: {
            position: 'bottom',
            display: true,
            labels: {
                generateLabels: function (chart) {
                    const datasets = chart.data.datasets[0].data;
                    const labels = chart.data.labels;

                    return labels.map((label, index) => {
                        const value = datasets[index];

                        return {
                            text: `${label}: ${value}`,
                            // text: [label, `${value}`],
                            fillStyle: chart.data.datasets[0].backgroundColor[index],
                            index: index,
                            strokeStyle: 'transparent',
                            borderWidth: 0,

                        };
                    });
                },
                boxWidth: 15,
                padding: 10,
                font: {
                    size: 14,
                },
            },
        },
        title: {
            display: true,
            text: 'Purchase Order Analysis',
            font: {
                size: 15,
            }
        }
    },
};

const fetchPurchaseOrderAnalysis = async () => {
    try {
        const response = await fetch('/api/method/go1_vendor.api.get_purchase_order_status_analysis');
        const data = await response.json();

        if (data.message && typeof data.message.status_data === 'object') {
            const statusData = data.message.status_data;

            const billedAmount = statusData['Billed Amount'] || 0;
            const amountToBill = statusData['Amount to Bill'] || 0;


            chartData.value = {
                ...chartData.value,
                datasets: [
                    {
                        ...chartData.value.datasets[0],
                        data: [billedAmount, amountToBill],
                        backgroundColor: ['#f797ca', '#4ff52a'],
                    },
                ],
                labels: ['Billed Amount', 'Amount to Bill'],
            };
        } else {
            console.error('Unexpected response:', data);
        }
    } catch (error) {
         console.error('Error fetching status data:', error);
    }
};

// Doghnut chart2
const materialRequestChartData = ref({
    labels: ['Pending', 'Completed'],
    datasets: [
        {
            label: 'Material Request Status',
            data: [0, 0],
            backgroundColor: ['#f205af', '#f797ca'],
            hoverBackgroundColor: ['#f205af', '#f797ca'],
        },
    ],
});

const materialRequestChartOptions = {
    responsive: true,
    plugins: {
        legend: {
            position: 'bottom',
            display: true,
            labels: {
                generateLabels: function (chart) {
                    const datasets = chart.data.datasets[0].data;
                    const labels = chart.data.labels;

                    return labels.map((label, index) => {
                        const value = datasets[index];
                        return {
                            text: `${label}: ${value}`,
                            fillStyle: chart.data.datasets[0].backgroundColor[index],
                            index: index,
                            strokeStyle: 'transparent',
                            borderWidth: 0,
                        };
                    });
                },
                boxWidth: 15,
                padding: 10,
                font: {
                    size: 14,
                },
            },
        },
        title: {
            display: true,
            text: 'RFQ Status',
            font: {
                size: 15,
            },
        },
    },

};


const fetchMaterialRequestStatus = async () => {
    try {
        const response = await fetch('/api/method/go1_vendor.api.get_quotation_status_counts');
        const data = await response.json();

        if (data.message && typeof data.message.status_data === 'object') {
            const statusData = data.message.status_data;

            materialRequestChartData.value = {
                ...materialRequestChartData.value,
                datasets: [
                    {
                        ...materialRequestChartData.value.datasets[0],
                        data: [
                            statusData['Pending'] || 0,
                            statusData['Completed'] || 0,
                        ],
                    },
                ],
            };
        } else {
            console.error('Unexpected response:', data);
        }
    } catch (error) {
         console.error('Error fetching material request status:', error);
    }
};

// On mounted lifecycle hook
onMounted(() => {
    fetchGrandTotal();
    fetchMaterialRequestStatus();
    fetchMonthlyGrandTotal();
    fetchPurchaseOrderAnalysis();
    pendingInvoiceCount();
    fetchPendingInwards();
    fetchTopSoldItems();
    fetchOpenRfqs();
});
</script>



