const req = {
  user:{
    _id: "5eb7c6b5bdfd1249a9841d89",
    name: "Rohit sarma",
    email: "sharmarohit@yahoo.com",
    password: "$2b$08$SaS.GXv3s1K3p7Qp0BhvXe1MPW1GzYXGaR1YGAkXjH3Jl7nSQDqGS",
    tokens: [
      {
        _id: "5eb7db9bed19dd88bd710ee3",
        token:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZWI3YzZiNWJkZmQxMjQ5YTk4NDFkODkiLCJpYXQiOjE1ODkxMDc2MTF9.Mp-mPNSd6yjmfIofFirIc6QL0qf13IrSj6OatexN87I",
      },
      {
        _id: "5eb7e01c31dbf17b9ccd1ea7",
        token:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZWI3YzZiNWJkZmQxMjQ5YTk4NDFkODkiLCJpYXQiOjE1ODkxMDg3NjR9.9SWXv-JYmZWbNHIJ_fvoMoO7WRy_Xkyzq7Nry7RS7oc",
      },
      {
        _id: "5eb7e01d31dbf17b9ccd1ea8",
        token:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZWI3YzZiNWJkZmQxMjQ5YTk4NDFkODkiLCJpYXQiOjE1ODkxMDg3NjV9.Z9flUk6Xm76EfiCr51Ar81unLUTBfw8WpgHvL_WvmaI",
      },
    ],
    __v: 6,
  }
};

const token =  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZWI3YzZiNWJkZmQxMjQ5YTk4NDFkODkiLCJpYXQiOjE1ODkxMDg3NjV9.Z9flUk6Xm76EfiCr51Ar81unLUTBfw8WpgHvL_WvmaI"  

console.log(req.user.tokens.length);
const data = req.user.tokens.filter(args => {
return args.token === token
})
console.log(data.length);
