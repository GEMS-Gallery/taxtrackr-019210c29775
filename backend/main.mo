import Func "mo:base/Func";
import Text "mo:base/Text";

import Array "mo:base/Array";
import Iter "mo:base/Iter";

actor {
  // Define the TaxPayer record type
  type TaxPayer = {
    tid: Text;
    firstName: Text;
    lastName: Text;
    address: Text;
  };

  // Stable variable to store TaxPayer records
  stable var taxpayers: [TaxPayer] = [];

  // Function to add a new TaxPayer record
  public func addTaxPayer(tid: Text, firstName: Text, lastName: Text, address: Text): async Text {
    // Check if TID already exists
    let existing = Array.find<TaxPayer>(taxpayers, func (tp) { tp.tid == tid });
    switch (existing) {
      case (null) {
        // Add new record if TID does not exist
        taxpayers := Array.append<TaxPayer>(taxpayers, [{ tid; firstName; lastName; address }]);
        return "TaxPayer added successfully.";
      };
      case (?_) {
        return "TID already exists.";
      };
    }
  };

  // Query function to get all TaxPayer records
  public query func getAllTaxPayers(): async [TaxPayer] {
    return taxpayers;
  };

  // Query function to search for a TaxPayer by TID
  public query func searchTaxPayer(tid: Text): async ?TaxPayer {
    return Array.find<TaxPayer>(taxpayers, func (tp) { tp.tid == tid });
  };
}
