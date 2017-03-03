<?php

namespace ContinuousNet\BiodyXpertBundle\Controller;

use ContinuousNet\BiodyXpertBundle\Entity\Pathology;
use ContinuousNet\BiodyXpertBundle\Form\PathologyType;

use Symfony\Component\HttpFoundation\Request;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;

/**
 * Pathology Controller
 * 
 * Manage Pathologies 
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
 * @see		PathologyController
 * @since	  Class available since Release 1.0
 * @access	 public
 * @Route("/pathology")
 */
class PathologyController extends BaseController
{
	/**
	 * Lists all Pathology entities.
	 *
	 * @Route("/", name="pathology_index")
	 * @Method("GET")
	 */
	public function indexAction()
	{
		$em = $this->getDoctrine()->getManager();

		$pathologies = $em->getRepository('BiodyXpertBundle:Pathology')->findAll();

		return $this->render('BiodyXpertBundle:Pathology:index.html.twig', array(
			'pathologies' => $pathologies,
		));
	}

	/**
	 * Creates a new Pathology entity.
	 *
	 * @Route("/new", name="pathology_new")
	 * @Method({"GET", "POST"})
	 */
	public function newAction(Request $request)
	{
		$pathology = new Pathology();
		$form = $this->createForm('ContinuousNet\BiodyXpertBundle\Form\PathologyType', $pathology);
		$form->handleRequest($request);

		if ($form->isSubmitted() && $form->isValid()) {
			$em = $this->getDoctrine()->getManager();
			$em->persist($pathology);
			$em->flush();

			return $this->redirectToRoute('pathology_show', array('id' => $pathology->getId()));
		}

		return $this->render('BiodyXpertBundle:Pathology:new.html.twig', array(
			'pathology' => $pathology,
			'form' => $form->createView(),
		));
	}

	/**
	 * Finds and displays a Pathology entity.
	 *
	 * @Route("/{id}", name="pathology_show")
	 * @Method("GET")
	 */
	public function showAction(Pathology $pathology)
	{
		$deleteForm = $this->createDeleteForm($pathology);

		return $this->render('BiodyXpertBundle:Pathology:show.html.twig', array(
			'pathology' => $pathology,
			'delete_form' => $deleteForm->createView(),
		));
	}

	/**
	 * Displays a form to edit an existing Pathology entity.
	 *
	 * @Route("/{id}/edit", name="pathology_edit")
	 * @Method({"GET", "POST"})
	 */
	public function editAction(Request $request, Pathology $pathology)
	{
		$deleteForm = $this->createDeleteForm($pathology);
		$editForm = $this->createForm('ContinuousNet\BiodyXpertBundle\Form\PathologyType', $pathology);
		$editForm->handleRequest($request);

		if ($editForm->isSubmitted() && $editForm->isValid()) {
			$em = $this->getDoctrine()->getManager();
			$em->persist($pathology);
			$em->flush();

			return $this->redirectToRoute('pathology_edit', array('id' => $pathology->getId()));
		}

		return $this->render('BiodyXpertBundle:Pathology:edit.html.twig', array(
			'pathology' => $pathology,
			'edit_form' => $editForm->createView(),
			'delete_form' => $deleteForm->createView(),
		));
	}

	/**
	 * Deletes a Pathology entity.
	 *
	 * @Route("/{id}", name="pathology_delete")
	 * @Method("DELETE")
	 */
	public function deleteAction(Request $request, Pathology $pathology)
	{
		$form = $this->createDeleteForm($pathology);
		$form->handleRequest($request);

		if ($form->isSubmitted() && $form->isValid()) {
			$em = $this->getDoctrine()->getManager();
			$em->remove($pathology);
			$em->flush();
		}

		return $this->redirectToRoute('pathology_index');
	}

	/**
	 * Creates a form to delete a Pathology entity.
	 *
	 * @param Pathology $pathology The Pathology entity
	 *
	 * @return \Symfony\Component\Form\Form The form
	 */
	private function createDeleteForm(Pathology $pathology)
	{
		return $this->createFormBuilder()
			->setAction($this->generateUrl('pathology_delete', array('id' => $pathology->getId())))
			->setMethod('DELETE')
			->getForm()
		;
	}
}
