
const convert = (user) => {

  console.log(user)
  return {
    id: user._id,
    uid: user.uid,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    active: user.active
  }
}

export { convert }
