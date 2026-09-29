import { Bot } from "lucide-react";


export default function AISection(){


return(

<section
id="ai"
className="
bg-[#071424]
py-24
"
>


<div className="
mx-auto
max-w-6xl
rounded-[40px]
border
border-white/10
bg-gradient-to-br
from-orange-500/20
to-blue-500/10
p-10
lg:p-16
"
>


<div className="
grid
gap-10
lg:grid-cols-2
items-center
">


<div>

<Bot
size={50}
className="text-orange-400"
/>


<h2 className="
mt-6
text-4xl
font-black
text-white
">

Your AI business assistant

</h2>


<p className="
mt-5
text-slate-300
leading-7
">

Ask questions about sales,
inventory and branches.
Yantra AI understands your business.

</p>


</div>



<div className="
rounded-3xl
bg-black/30
p-6
border
border-white/10
">


<div className="
rounded-2xl
bg-orange-500
p-4
text-white
">

Which branch performed best?

</div>



<div className="
mt-4
rounded-2xl
bg-white/10
p-4
text-slate-200
">

Mumbai branch increased sales by 24%
this month.

</div>


</div>



</div>


</div>


</section>

)

}