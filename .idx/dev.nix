# To learn more about how to customize this file,
# see: https://developers.google.com/idx/guides/customize-idx-env
{ pkgs, ... }: {
  # Which nixpkgs channel to use.
  channel = "unstable"; # or "stable-24.05"
  # Use https://search.nixos.org/packages to find packages
  packages = [
    pkgs.zip
    pkgs.unzip
    pkgs.nodejs_22  # Using Node.js v22 to meet Vite requirements
    pkgs.bun
  ];
  # Sets environment variables in the workspace.
  env = { };
  # VS Code extensions that should be installed in the workspace.
  idx = {
    extensions = [
      "dbaeumer.vscode-eslint"
      "bradlc.vscode-tailwindcss"
    ];
    # Workspace settings that should be applied in the workspace.
    workspace = {
      # Runs when a workspace is first created.
      onCreate = {
        install-deps = "bun install";
      };
      # Runs every time the workspace is (re)started.
      onStart = {
        start-dev-server = "bun run dev";
      };
    };
    # Previews that should be shown in the workspace.
    previews = {
      enable = true;
      previews = {
        web = {
          command = ["bun" "run" "dev""--" "--port" "$PORT"];
          manager = "web";
        };
      };
    };
  };
}
