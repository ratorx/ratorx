import { config } from "content"
import { Hero } from "web/hero"
import { Page } from "../shared"
export const Main = () => <Page
  title={`${config.first}'s Website`}
  description={`${config.first} awesome website. Awe not guaranteed. No refunds.`}
>
  <main className="flex-grow navbar-margin-top xl:navbar-margin-left">
    <Hero />
  </main>
</Page>