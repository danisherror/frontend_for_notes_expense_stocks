import React from 'react';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import ChartOne from './template';

const Chart: React.FC = () => {
  return (
    <>
      <Breadcrumb pageName="Chart" />

      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <ChartOne />
      </div>
    </>
  );
};

export default Chart;
