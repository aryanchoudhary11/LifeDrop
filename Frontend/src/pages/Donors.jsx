import { useState } from "react";

export default function Donors() {
  const [donors, setDonors] = useState([]);
  const [pincode, setPincode] = useState("");
  const [bloodType, setBloodType] = useState("");
  const [loading, setLoading] = useState(true);
  return (
    <div>
      <div>
        <h1>🩸 Donor Directory</h1>
        <form>
          <input
            type="text"
            placeholder="Enter Pincode.."
            value={pincode}
            onChange={(e) => setPincode(e.target.value)}
          />
          <select
            value={bloodType}
            onChange={(e) => setBloodType(e.target.value)}
            className="p-3 border rounded-xl w-60"
          >
            <option value="">All Blood Types</option>
            <option value="A+">A+</option>
            <option value="A-">A-</option>
            <option value="B+">B+</option>
            <option value="B-">B-</option>
            <option value="AB+">AB+</option>
            <option value="AB-">AB-</option>
            <option value="O+">O+</option>
            <option value="O-">O-</option>
          </select>
          <button type="submit">Search</button>
        </form>
      </div>
    </div>
  );
}
