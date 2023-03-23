const calculateTrustScore = (transactions, inspector) => {

  let score = 0
  let txCount = transactions.length
  let totalAmount = 0
  let maxAmount = 0

  transactions.forEach((tx) => {
    const txWith = tx.with.toLowerCase()
    const txValue = parseInt(tx.amount)

    // Check if the inspected account (which is associated with the transactions being passed in) 
    // has "honoured" a proposal from the inspector account
    if (txWith === inspector.toLowerCase() && tx.type === "Honoured") {
      score += 2
    }

    // Check if the inspected account has "forgiven" the inspector account
    if (txWith === inspector.toLowerCase() && tx.type === "Forgiven") {
      score += 2
    }

    // Check if the inspected account has "accepted" a forgiven transaction from the inspector account
    if (txWith === inspector.toLowerCase() && tx.type === "Accepted") {
      score += 2
    }

    // Calculate total amount, and max amount
      totalAmount += txValue
      if (txValue > maxAmount) {
        maxAmount = txValue
      }
  })

  // Calculate the average transaction amount
  const avgAmount = totalAmount / txCount

  // Check if the account has proposed an amount more than 2 magnitudes of order larger than its average
  if (maxAmount > 100 * avgAmount) {
    score -= 1
  }

  // Check if the account has accepted a transaction that is 2 magnitudes of order larger than its average
  transactions.forEach((tx) => {
    const txValue = parseInt(tx.value)
    if (tx.type === 'Accepted' && txValue > 100 * avgAmount) {
      score -= 1
    }
  })

  return score
}

export default calculateTrustScore