{
  description = "Atomic GitOps Demo with Node.js and Nix";

  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-24.05";
    flake-utils.url = "github:numtide/flake-utils";
  };

  outputs = { self, nixpkgs, flake-utils, ... }:
    flake-utils.lib.eachDefaultSystem (system:
      let
        pkgs = import nixpkgs { inherit system; };
      in {
        devShells.default = pkgs.mkShell {
          buildInputs = with pkgs; [
            nodejs_20
            npm
            git
          ];

          shellHook = ''
            echo "🚀 DevOps Node.js Shell Ready"
            echo "Run: npm install && npm run dev"
          '';
        };
      });
}
