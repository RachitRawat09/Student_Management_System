const Student = require('../models/Student');
const Fee = require('../models/Fee');

// Get dashboard statistics
const getDashboardStats = async (req, res) => {
  try {
    // Get total students (approved admissions)
    const totalStudents = await Student.countDocuments({ 
      admissionStatus: 'Approved' 
    });

    // Get pending admissions
    const pendingAdmissions = await Student.countDocuments({ 
      admissionStatus: 'Pending' 
    });

    // Get hostel occupancy
    const totalHostelStudents = await Student.countDocuments({
      'hostel.allocation.status': 'Active'
    });
    
    // Assuming total hostel capacity (you can make this configurable)
    const totalHostelCapacity = 500; // This could be stored in a config or database
    const hostelOccupancy = totalHostelCapacity > 0 
      ? Math.round((totalHostelStudents / totalHostelCapacity) * 100) 
      : 0;

    // Get fees collected this month
    const currentMonth = new Date();
    const startOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1);
    const endOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0);

    const feesCollectedThisMonth = await Fee.aggregate([
      {
        $unwind: '$payments'
      },
      {
        $match: {
          'payments.status': 'Completed',
          'payments.paymentDate': {
            $gte: startOfMonth,
            $lte: endOfMonth
          }
        }
      },
      {
        $group: {
          _id: null,
          totalAmount: { $sum: '$payments.amount' }
        }
      }
    ]);

    const feesCollected = feesCollectedThisMonth.length > 0 
      ? feesCollectedThisMonth[0].totalAmount 
      : 0;

    // Format fees collected (convert to lakhs)
    const feesCollectedFormatted = feesCollected > 0 
      ? `₹${(feesCollected / 100000).toFixed(1)}L`
      : '₹0L';

    res.status(200).json({
      success: true,
      data: {
        totalStudents,
        pendingAdmissions,
        hostelOccupancy: `${hostelOccupancy}%`,
        feesCollected: feesCollectedFormatted,
        feesCollectedAmount: feesCollected
      }
    });

  } catch (error) {
    console.error('Error fetching dashboard stats:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching dashboard statistics',
      error: error.message
    });
  }
};

module.exports = {
  getDashboardStats
};
