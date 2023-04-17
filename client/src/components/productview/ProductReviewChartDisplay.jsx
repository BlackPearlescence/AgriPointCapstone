import styles from "./ProductReviewChartDisplay.module.scss";

import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);



const ProductReviewChartDisplay = ({ reviewStatistics }) => {
    const options = {
        indexAxis: "y",
        elements: {
            bar: {
                borderWidth: 2,
            },
        },
        scales: {
            yAxes: {
                ticks: {
                    color: "white"
                },
            },
            xAxes: {
                ticks: {
                    color: "white"
                },
            },
        },
        
        responsive: true,
        plugins: {
            legend: {
                position: "right",
            },
        },
        // maintainAspectRatio: false,
    }
    
    const labels = ["5", "4", "3", "2", "1"];
    
    const data = {
        labels: labels,
        datasets: [
            {
                label: "Number of Reviews",
                data: reviewStatistics && [reviewStatistics.fiveStars, reviewStatistics.fourStars, reviewStatistics.threeStars, reviewStatistics.twoStars, reviewStatistics.oneStars],
                backgroundColor: "#1af675",
                borderColor: "#1af67",
                borderWidth: 1,
                color: "white"
            }
        ],
    }

    return (
        <div className={styles.chartDisplayContainer}>
            <h3 className={styles.chartDisplayTitle}>Ratings</h3>
            <Bar data={data} options={options} height={"400px"} width={"700px"}/>
        </div>
    )
}

export default ProductReviewChartDisplay;