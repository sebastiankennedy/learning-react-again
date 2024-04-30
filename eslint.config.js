import styleGuide from "eslint-config-standard";
export default [
  ...[].concat(styleGuide),
  {
       rules: {
           "no-unused-vars": "warn",
           "no-undef": "warn"
       }
   }
];
