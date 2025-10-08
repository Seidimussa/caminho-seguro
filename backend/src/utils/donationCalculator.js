class DonationCalculator {
  static calculateDonations(totalSold) {
    return Math.floor(totalSold / 100);
  }

  static updateDonationCounter(soldCount) {
    const donatedCount = this.calculateDonations(soldCount);
    return {
      totalSold: soldCount,
      totalDonated: donatedCount,
      nextDonationAt: Math.ceil(soldCount / 100) * 100
    };
  }
}

module.exports = DonationCalculator;