import { createClient } from "next-sanity";
import Image from "next/image";
import imageUrlFor from "../util";


export default function IndexPage({ pets }) {
  return (
    <>
      <header>
        <h1>Sanity + Next.js</h1>
      </header>
      <main>
        <h2>Pets</h2>
        {pets.length > 0 && (
          <ul>
            {pets.map((pet) => (
              <li key={pet._id}>{pet?.name}
              <Image src={pet?.imageUrl} width={400} height={400} />
              </li>
            ))}
          </ul>
        )}
        {!pets.length > 0 && <p>No pets to show</p>}
        {pets.length > 0 && (
          <div>
            <pre>{JSON.stringify(pets, null, 2)}</pre>
          </div>
        )}
        {!pets.length > 0 && (
          <div>
            <div>¯\_(ツ)_/¯</div>
            <p>
              Your data will show up here when you've configured everything
              correctly
            </p>
          </div>
        )}
      </main>
    </>
  );
}

const client = createClient({
  projectId: "hivcyaky",
  dataset: "production",
  apiVersion: "2023-06-08",
  useCdn: false
})

export async function getStaticProps() {
  const query = `*[_type == 'pet']{name, "imageUrl": picture.asset->url}`
  const pets = await client.fetch(query)


  return {
    props: {
      pets
    }
  };
}
