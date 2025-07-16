const UserDetails = ({ userDetails }) => {
  return (
    <section className="bg-white rounded-lg shadow p-6">
      <h4 className="text-xl font-semibold mb-4 text-gray-800">Account Details</h4>
      <table className="w-full text-left">
        <tbody className="divide-y divide-gray-200">
          <tr className="py-2">
            <th className="px-0 py-2 font-medium text-gray-700">First Name:</th>
            <td className="px-0 py-2 text-gray-800">{userDetails.firstName}</td>
          </tr>
          <tr className="py-2">
            <th className="px-0 py-2 font-medium text-gray-700">Last Name:</th>
            <td className="px-0 py-2 text-gray-800">{userDetails.lastName}</td>
          </tr>
          <tr className="py-2">
            <th className="px-0 py-2 font-medium text-gray-700">Email:</th>
            <td className="px-0 py-2 text-gray-800">{userDetails.email}</td>
          </tr>
        </tbody>
      </table>
    </section>
  );
};

export default UserDetails;
