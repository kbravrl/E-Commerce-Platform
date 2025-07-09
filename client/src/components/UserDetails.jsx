const UserDetails = ({ userDetails }) => {
  return (
    <>
      <h4>Account Details</h4>
      <table className="table table-borderless">
        <tbody>
          <tr>
            <th scope="row">First Name :</th>
            <td>{userDetails.firstName}</td>
          </tr>
          <tr>
            <th scope="row">Last Name :</th>
            <td>{userDetails.lastName}</td>
          </tr>
          <tr>
            <th scope="row">Email :</th>
            <td>{userDetails.email}</td>
          </tr>
        </tbody>
      </table>
    </>
  );
};

export default UserDetails;
