import peerDepsExternal from "rollup-plugin-peer-deps-external";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "rollup-plugin-typescript2";
import postcss from "rollup-plugin-postcss";
import json from "@rollup/plugin-json";

const packageJson = require("./package.json");

export default {
    input: "src/index.ts",
    output: [
        {
            file: packageJson.main,
            format: "cjs",
            sourcemap: true
        },
        {
            file: packageJson.module,
            format: "esm",
            sourcemap: true
        }
    ],
    plugins: [
        peerDepsExternal(),
        json(),
        resolve({
          preferBuiltins: true,
          mainFields: ['events', 'buffer', 'url', 'assert', 'util']
        }),
        commonjs(),
        typescript({ useTsconfigDeclarationDir: true }),
        postcss({
          extensions: [".css"],
          extract: true,
        })
    ],
    external: ["semver", "solive-compiler", "solive-solc", "solive-provider", "ethers"]
};
