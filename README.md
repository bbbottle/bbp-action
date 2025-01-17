# release-bbp-action
Reusable action used to build and publish bbki.ng's plugins.

## Inputs
```yaml
inputs:
  hcp_client_id:
    description: 'The client id of hcp'
    required: true
  hcp_client_secret:
    description: 'The client secret of hcp'
    required: true
  wasm:
    description: 'The name of wasm file (eg. bbp_now.wasm)'
    required: true
```

## Examples
- [bbp-coc workflow](https://github.com/bbbottle/bbp-coc/blob/5b3694382648be76eac2118e1389fdf26154b499/.github/workflows/rust.yml#L12) 
```yaml
  build:
    runs-on: ubuntu-latest
    steps:
    - name: build
      uses: bbbottle/bbp-action@build
    - name: release
      uses: bbbottle/bbp-action@v1.0.51
      with:
        hcp_client_id: ${{ secrets.HCP_CLIENT_ID }}
        hcp_client_secret: ${{ secrets.HCP_CLIENT_SECRET }}
        wasm: "bbp_coc.wasm"
```
