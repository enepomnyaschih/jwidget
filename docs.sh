# Build documentation
echo Building documentation
echo "WARNING! Make sure you build documentation from final version of release branch, because TypeDoc uses it for reference."

pushd public/jwui >> /dev/null
mv jwui.ref.ts jwui.temp.ts
sed -e 's/build\/d\.ts\/jwlib\.d\.ts/jwlib\/jwlib\.ref\.ts/g' jwui.temp.ts > jwui.ref.ts
popd >> /dev/null

pushd public/plugins >> /dev/null
mv locale.ts locale.temp.ts
mv router.ts router.temp.ts
sed -e 's/build\/d\.ts\/jwlib\.d\.ts/jwlib\/jwlib\.ref\.ts/g' locale.temp.ts > locale.ts
sed -e 's/build\/d\.ts\/jwui\.d\.ts/jwui\/jwui\.ref\.ts/g' router.temp.ts > router.ts
popd >> /dev/null

typedoc --exclude *.ref.ts --mode file --out ../woof-docs public/jwlib/core public/jwlib/collection public/jwlib/property public/jwlib/utils public/jwui/core public/jwui/property public/plugins/locale.ts public/plugins/router.ts

pushd public/jwui >> /dev/null
rm jwui.ref.ts
mv jwui.temp.ts jwui.ref.ts
popd >> /dev/null

pushd public/plugins >> /dev/null
rm locale.ts
rm router.ts
mv locale.temp.ts locale.ts
mv router.temp.ts router.ts
popd >> /dev/null
