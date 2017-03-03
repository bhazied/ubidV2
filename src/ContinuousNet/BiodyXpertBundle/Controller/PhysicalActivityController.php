<?php

namespace ContinuousNet\BiodyXpertBundle\Controller;

use ContinuousNet\BiodyXpertBundle\Entity\PhysicalActivity;
use ContinuousNet\BiodyXpertBundle\Form\PhysicalActivityType;

use Symfony\Component\HttpFoundation\Request;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;

/**
 * Physical Activity Controller
 * 
 * Manage PhysicalActivities 
 * 
 * PHP version 5.4.4
 * 
 * @category   Symfony 2 Controller
 * @package	ContinuousNet\BiodyXpertBundle\Controller
 * @author	 Sahbi KHALFALLAH <sahbi.khalfallah@continuousnet.com>
 * @copyright  2017 CONTINUOUS NET
 * @license	CONTINUOUS NET REGULAR LICENSE
 * @version	Release: 1.0
 * @link	   http://biodyxpert.continuousnet.com/ContinuousNet/BiodyXpertBundle/Controller
 * @see		PhysicalActivityController
 * @since	  Class available since Release 1.0
 * @access	 public
 * @Route("/physicalactivity")
 */
class PhysicalActivityController extends BaseController
{
	/**
	 * Lists all PhysicalActivity entities.
	 *
	 * @Route("/", name="physicalactivity_index")
	 * @Method("GET")
	 */
	public function indexAction()
	{
		$em = $this->getDoctrine()->getManager();

		$physicalActivities = $em->getRepository('BiodyXpertBundle:PhysicalActivity')->findAll();

		return $this->render('BiodyXpertBundle:PhysicalActivity:index.html.twig', array(
			'physicalActivities' => $physicalActivities,
		));
	}

	/**
	 * Creates a new PhysicalActivity entity.
	 *
	 * @Route("/new", name="physicalactivity_new")
	 * @Method({"GET", "POST"})
	 */
	public function newAction(Request $request)
	{
		$physicalActivity = new PhysicalActivity();
		$form = $this->createForm('ContinuousNet\BiodyXpertBundle\Form\PhysicalActivityType', $physicalActivity);
		$form->handleRequest($request);

		if ($form->isSubmitted() && $form->isValid()) {
			$em = $this->getDoctrine()->getManager();
			$em->persist($physicalActivity);
			$em->flush();

			return $this->redirectToRoute('physicalactivity_show', array('id' => $physicalActivity->getId()));
		}

		return $this->render('BiodyXpertBundle:PhysicalActivity:new.html.twig', array(
			'physicalActivity' => $physicalActivity,
			'form' => $form->createView(),
		));
	}

	/**
	 * Finds and displays a PhysicalActivity entity.
	 *
	 * @Route("/{id}", name="physicalactivity_show")
	 * @Method("GET")
	 */
	public function showAction(PhysicalActivity $physicalActivity)
	{
		$deleteForm = $this->createDeleteForm($physicalActivity);

		return $this->render('BiodyXpertBundle:PhysicalActivity:show.html.twig', array(
			'physicalActivity' => $physicalActivity,
			'delete_form' => $deleteForm->createView(),
		));
	}

	/**
	 * Displays a form to edit an existing PhysicalActivity entity.
	 *
	 * @Route("/{id}/edit", name="physicalactivity_edit")
	 * @Method({"GET", "POST"})
	 */
	public function editAction(Request $request, PhysicalActivity $physicalActivity)
	{
		$deleteForm = $this->createDeleteForm($physicalActivity);
		$editForm = $this->createForm('ContinuousNet\BiodyXpertBundle\Form\PhysicalActivityType', $physicalActivity);
		$editForm->handleRequest($request);

		if ($editForm->isSubmitted() && $editForm->isValid()) {
			$em = $this->getDoctrine()->getManager();
			$em->persist($physicalActivity);
			$em->flush();

			return $this->redirectToRoute('physicalactivity_edit', array('id' => $physicalActivity->getId()));
		}

		return $this->render('BiodyXpertBundle:PhysicalActivity:edit.html.twig', array(
			'physicalActivity' => $physicalActivity,
			'edit_form' => $editForm->createView(),
			'delete_form' => $deleteForm->createView(),
		));
	}

	/**
	 * Deletes a PhysicalActivity entity.
	 *
	 * @Route("/{id}", name="physicalactivity_delete")
	 * @Method("DELETE")
	 */
	public function deleteAction(Request $request, PhysicalActivity $physicalActivity)
	{
		$form = $this->createDeleteForm($physicalActivity);
		$form->handleRequest($request);

		if ($form->isSubmitted() && $form->isValid()) {
			$em = $this->getDoctrine()->getManager();
			$em->remove($physicalActivity);
			$em->flush();
		}

		return $this->redirectToRoute('physicalactivity_index');
	}

	/**
	 * Creates a form to delete a PhysicalActivity entity.
	 *
	 * @param PhysicalActivity $physicalActivity The PhysicalActivity entity
	 *
	 * @return \Symfony\Component\Form\Form The form
	 */
	private function createDeleteForm(PhysicalActivity $physicalActivity)
	{
		return $this->createFormBuilder()
			->setAction($this->generateUrl('physicalactivity_delete', array('id' => $physicalActivity->getId())))
			->setMethod('DELETE')
			->getForm()
		;
	}
}
