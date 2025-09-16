import React from "react";

const StudentFees = () => {
  // Dummy data for fees
  const feeSummary = {
    totalFees: "₹1,50,000",
    paidAmount: "₹1,20,000",
    pendingAmount: "₹30,000",
    nextDueDate: "March 31, 2024",
    status: "Partially Paid"
  };

  const feeBreakdown = [
    {
      category: "Tuition Fees",
      amount: "₹80,000",
      paid: "₹80,000",
      pending: "₹0",
      status: "Paid",
      dueDate: "Aug 15, 2023"
    },
    {
      category: "Hostel Fees",
      amount: "₹40,000",
      paid: "₹32,000",
      pending: "₹8,000",
      status: "Partially Paid",
      dueDate: "March 31, 2024"
    },
    {
      category: "Library Fees",
      amount: "₹5,000",
      paid: "₹5,000",
      pending: "₹0",
      status: "Paid",
      dueDate: "Aug 15, 2023"
    },
    {
      category: "Examination Fees",
      amount: "₹15,000",
      paid: "₹3,000",
      pending: "₹12,000",
      status: "Partially Paid",
      dueDate: "March 31, 2024"
    },
    {
      category: "Development Fees",
      amount: "₹10,000",
      paid: "₹0",
      pending: "₹10,000",
      status: "Pending",
      dueDate: "March 31, 2024"
    }
  ];

  const paymentHistory = [
    {
      id: "PAY001",
      amount: "₹30,000",
      date: "January 15, 2024",
      method: "Online Banking",
      category: "Hostel Fees",
      status: "Success"
    },
    {
      id: "PAY002",
      amount: "₹3,000",
      date: "January 10, 2024",
      method: "Credit Card",
      category: "Examination Fees",
      status: "Success"
    },
    {
      id: "PAY003",
      amount: "₹80,000",
      date: "August 15, 2023",
      method: "Online Banking",
      category: "Tuition Fees",
      status: "Success"
    },
    {
      id: "PAY004",
      amount: "₹5,000",
      date: "August 15, 2023",
      method: "Online Banking",
      category: "Library Fees",
      status: "Success"
    },
    {
      id: "PAY005",
      amount: "₹2,000",
      date: "August 10, 2023",
      method: "UPI",
      category: "Hostel Fees",
      status: "Success"
    }
  ];

  const upcomingPayments = [
    {
      category: "Hostel Fees",
      amount: "₹8,000",
      dueDate: "March 31, 2024",
      priority: "High"
    },
    {
      category: "Examination Fees",
      amount: "₹12,000",
      dueDate: "March 31, 2024",
      priority: "High"
    },
    {
      category: "Development Fees",
      amount: "₹10,000",
      dueDate: "March 31, 2024",
      priority: "Medium"
    }
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 to-blue-600 rounded-xl p-6 text-white">
        <h1 className="text-3xl font-bold mb-2">💰 Fee Management</h1>
        <p className="text-green-100">
          Track your payments and manage your fees
        </p>
      </div>

      {/* Fee Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-lg text-center">
          <div className="text-3xl font-bold text-blue-600 mb-2">{feeSummary.totalFees}</div>
          <div className="text-sm text-gray-600">Total Fees</div>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-lg text-center">
          <div className="text-3xl font-bold text-green-600 mb-2">{feeSummary.paidAmount}</div>
          <div className="text-sm text-gray-600">Paid Amount</div>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-lg text-center">
          <div className="text-3xl font-bold text-red-600 mb-2">{feeSummary.pendingAmount}</div>
          <div className="text-sm text-gray-600">Pending Amount</div>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-lg text-center">
          <div className="text-3xl font-bold text-orange-600 mb-2">{feeSummary.nextDueDate}</div>
          <div className="text-sm text-gray-600">Next Due Date</div>
        </div>
      </div>

      {/* Payment Status */}
      <div className="bg-white rounded-xl p-6 shadow-lg">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-900">Payment Status</h2>
          <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
            feeSummary.status === 'Fully Paid' ? 'bg-green-100 text-green-800' :
            feeSummary.status === 'Partially Paid' ? 'bg-yellow-100 text-yellow-800' :
            'bg-red-100 text-red-800'
          }`}>
            {feeSummary.status}
          </span>
        </div>
        
        <div className="w-full bg-gray-200 rounded-full h-3 mb-4">
          <div 
            className="bg-gradient-to-r from-green-500 to-blue-500 h-3 rounded-full transition-all duration-300"
            style={{ width: `${(120000 / 150000) * 100}%` }}
          ></div>
        </div>
        
        <div className="flex justify-between text-sm text-gray-600">
          <span>Paid: {feeSummary.paidAmount}</span>
          <span>Total: {feeSummary.totalFees}</span>
        </div>
      </div>

      {/* Fee Breakdown */}
      <div className="bg-white rounded-xl p-6 shadow-lg">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Fee Breakdown</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Category</th>
                <th className="text-right py-3 px-4 font-semibold text-gray-700">Total Amount</th>
                <th className="text-right py-3 px-4 font-semibold text-gray-700">Paid</th>
                <th className="text-right py-3 px-4 font-semibold text-gray-700">Pending</th>
                <th className="text-center py-3 px-4 font-semibold text-gray-700">Status</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Due Date</th>
              </tr>
            </thead>
            <tbody>
              {feeBreakdown.map((fee, index) => (
                <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4 font-medium">{fee.category}</td>
                  <td className="py-3 px-4 text-right font-semibold">{fee.amount}</td>
                  <td className="py-3 px-4 text-right text-green-600 font-semibold">{fee.paid}</td>
                  <td className="py-3 px-4 text-right text-red-600 font-semibold">{fee.pending}</td>
                  <td className="py-3 px-4 text-center">
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      fee.status === 'Paid' ? 'bg-green-100 text-green-800' :
                      fee.status === 'Partially Paid' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {fee.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-gray-600">{fee.dueDate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Upcoming Payments */}
      <div className="bg-white rounded-xl p-6 shadow-lg">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-900">⚠️ Upcoming Payments</h2>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
            Pay Now
          </button>
        </div>
        <div className="space-y-3">
          {upcomingPayments.map((payment, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-semibold text-gray-900">{payment.category}</h3>
                  <p className="text-sm text-gray-600">Due: {payment.dueDate}</p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-red-600">{payment.amount}</p>
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                    payment.priority === 'High' ? 'bg-red-100 text-red-800' :
                    payment.priority === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-green-100 text-green-800'
                  }`}>
                    {payment.priority} Priority
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Payment History */}
      <div className="bg-white rounded-xl p-6 shadow-lg">
        <h2 className="text-xl font-bold text-gray-900 mb-4">📋 Payment History</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Payment ID</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Category</th>
                <th className="text-right py-3 px-4 font-semibold text-gray-700">Amount</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Method</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Date</th>
                <th className="text-center py-3 px-4 font-semibold text-gray-700">Status</th>
              </tr>
            </thead>
            <tbody>
              {paymentHistory.map((payment, index) => (
                <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4 font-medium text-blue-600">{payment.id}</td>
                  <td className="py-3 px-4">{payment.category}</td>
                  <td className="py-3 px-4 text-right font-semibold text-green-600">{payment.amount}</td>
                  <td className="py-3 px-4">{payment.method}</td>
                  <td className="py-3 px-4 text-gray-600">{payment.date}</td>
                  <td className="py-3 px-4 text-center">
                    <span className="px-2 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-800">
                      {payment.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Payment Methods */}
      <div className="bg-white rounded-xl p-6 shadow-lg">
        <h2 className="text-xl font-bold text-gray-900 mb-4">💳 Payment Methods</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="border border-gray-200 rounded-lg p-4 text-center hover:shadow-md transition-shadow cursor-pointer">
            <div className="text-3xl mb-2">🏦</div>
            <h3 className="font-semibold text-gray-900">Online Banking</h3>
            <p className="text-sm text-gray-600">Direct bank transfer</p>
          </div>
          <div className="border border-gray-200 rounded-lg p-4 text-center hover:shadow-md transition-shadow cursor-pointer">
            <div className="text-3xl mb-2">💳</div>
            <h3 className="font-semibold text-gray-900">Credit/Debit Card</h3>
            <p className="text-sm text-gray-600">Visa, Mastercard, RuPay</p>
          </div>
          <div className="border border-gray-200 rounded-lg p-4 text-center hover:shadow-md transition-shadow cursor-pointer">
            <div className="text-3xl mb-2">📱</div>
            <h3 className="font-semibold text-gray-900">UPI Payment</h3>
            <p className="text-sm text-gray-600">PhonePe, Google Pay, Paytm</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentFees;
