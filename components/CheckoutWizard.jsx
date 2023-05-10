import React from 'react';

const CheckoutWizard = ({ activeStep = 0 }) => {
  const stepCheckouts = [
    'Xác thực',
    'Địa chỉ',
    'Phương thức thanh toán',
    'Hoàn tất đặt hàng',
  ];
  return (
    <div className='mb-5 flex flex-wrap text-lg font-semibold'>
      {stepCheckouts.map((step, index) => (
        <div
          key={step}
          className={`flex-1 border-b-4 text-center ${
            index <= activeStep
              ? 'border-indigo-500 text-indigo-500'
              : 'border-gray-400 text-gray-400'
          }`}
        >
          {step}
        </div>
      ))}
    </div>
  );
};

export default CheckoutWizard;
